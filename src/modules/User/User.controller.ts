import { Controller, Get, Query } from "@nestjs/common";
import UserService from './User.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
  @Get('info')
  info(@Query('token') token) {
    return this.userService.getUserInfo(token)
  }
}