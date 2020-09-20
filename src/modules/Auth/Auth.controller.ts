import { Controller, Get, Query, Res, Redirect } from '@nestjs/common';
import AuthService from './Auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauth/redirect')
  @Redirect('http://localhost:9000', 302)
  async oauth(@Query('code') code, @Res() res): Promise<any> {
    const token = await this.authService.getAccessToken(code)
    if (!token) {
      return { url: 'http://localhost:9000/#/failed' }
    }
    await this.authService.login(token, res)
    return { url: `http://localhost:9000/#/` }
  }
}
