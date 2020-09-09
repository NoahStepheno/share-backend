import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import axios from 'axios';

@Injectable()
export default class AuthService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async getAccessToken(code: string): Promise<string> {
    const clientID = this.configService.get<string>('auth.clientId')
    const clientSecret = this.configService.get<string>('auth.clientSecret')
    
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${clientID}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: 'application/json'
      }
    });
    return tokenResponse.data.access_token;
  }
}