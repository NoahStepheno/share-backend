import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import oauth from '../../config/oauth';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './Auth.controller';
import AuthService from './Auth.service';
import UserModule from '../User/User.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './Auth.const';

@Module({
  imports: [
    ConfigModule.forFeature(oauth),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}