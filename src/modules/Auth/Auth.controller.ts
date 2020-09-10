import { Controller, Get, Query, Res } from '@nestjs/common';
import AuthService from './Auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauth/redirect')
  async oauth(@Query('code') code, @Res() res ): Promise<void> {
    const token = await this.authService.getAccessToken(code)
    res.status(302).redirect(`http://localhost:9000/#/?token=${token}`)
  }
}
