import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class UserService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async getUserInfo(token: string) {
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