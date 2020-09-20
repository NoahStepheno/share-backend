import { Controller, Get, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res): void {
    // res.header('a', '2')
    res.status(HttpStatus.CREATED).send(this.appService.getHello());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Request() req): string {
    return req.user
  }
}
