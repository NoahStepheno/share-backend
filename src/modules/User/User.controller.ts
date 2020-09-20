import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import UserService from './User.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getInfo(@Req() req) {
    return await this.userService.findOne(req.user.userId)
  }
}