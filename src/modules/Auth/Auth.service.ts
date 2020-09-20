import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt'
import { User } from '../User/User.entity';
import UserService from '../User/User.service';
import { GithubInfo } from './interface';

const transformGithubInfoToUser = (githubInfo: GithubInfo, user?: User) => {
  let target = null
  if (user) {
    target = user
  } else {
    target = new User()
  }
  target.githubID = githubInfo.id
  target.email = githubInfo.email
  target.nickname = githubInfo.login
  target.avatar = githubInfo.avatar_url
  return target
}

@Injectable()
export default class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jstService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getAccessToken(code: string): Promise<string> {
    const clientID = this.configService.get<string>('auth.clientId')
    const clientSecret = this.configService.get<string>('auth.clientSecret')
    
    const tokenResponse: any = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${clientID}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: 'application/json'
      }
    });
    return tokenResponse?.data.access_token;
  }

  async login(token: string, res: any) {
    const info: GithubInfo = await this.getGithubInfo(token)
    let user = await this.userService.find({
      where: {
        githubID: info.id
      }
    })
    user = transformGithubInfoToUser(info, user)
    user = await this.userService.update(user)
    const payload = { nickname: user.nickname, sub: user.id }
    // const payload = { nickname: '123123', sub: 123 }
    const accessToken =  this.jstService.sign(payload, {
      expiresIn: '7 days'
    })
    console.log({ accessToken })
    res.cookie('token', accessToken, { maxAge: 1 * 24 * 3600 * 1e3, httpOnly: true, signed: true })
  }

  async validateUser(userId: number): Promise<any> {
    return this.userService.findOne(userId)
  }

  async getGithubInfo(token: string) {
    if (!token) return null
    const result = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${token}`
      }
    });
    return result.data
  }
}