import { Controller, Get } from '@nestjs/common';
import AuthService from './Auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauth')
  oauth(): string {
    this.authService.getAccessToken('123')
    return 'This route is protected.';
  }
}
