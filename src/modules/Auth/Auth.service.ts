import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt'
import { User } from '../User/User.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jstService: JwtService
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

  async login(user: User) {
    const payload = { nickname: user.nickname, sub: user.id }
    return {
      access_token: this.jstService.sign(payload)
    }
  }
}