import { Controller, Get, Req } from "@nestjs/common";
import UserService from './User.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('test')
  test() {
    return 'hello test'
  }

  @Get('info')
  async getInfo(@Req() req) {
    const token = req.signedCookies.token
    const info = await this.userService.getUserInfo(token)
    return info
  }
}