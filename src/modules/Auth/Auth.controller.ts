import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import AuthService from './Auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauth/redirect')
  async oauth(@Query('code') code, @Res() res): Promise<void> {
    const token = await this.authService.getAccessToken(code)
    if (!token) {
      res.status(302).redirect(`http://localhost:9000/#/failed`)
      return
    }
    res.cookie('token', token, { maxAge: 1 * 24 * 3600 * 1e3, httpOnly: true, signed: true })
    res.status(302).redirect(`http://localhost:9000/#/`)
  }
}
