import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class UserService {
  constructor(
    private readonly configService: ConfigService
  ) {}
  async getUserInfo(token: string) {
    const clientID = this.configService.get<string>('auth.clientId')
    const clientSecret = this.configService.get<string>('auth.clientSecret')
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${clientID}&` +
        `client_secret=${clientSecret}&` +
        `code=${token}`,
      headers: {
        accept: 'application/json'
      }
    });
    return tokenResponse
  }
}