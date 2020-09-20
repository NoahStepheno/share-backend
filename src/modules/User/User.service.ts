import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from "typeorm";
import { User } from './User.entity';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export default class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOne (id: number) {
    return await this.userRepository.findOne(id)
  }

  async find (...args) {
    return await this.userRepository.findOne(...args)
  }

  async create(user: User) {
    return await this.userRepository.save(user)
  }

  async update(user: User) {
    return await this.userRepository.save(user)
  }

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