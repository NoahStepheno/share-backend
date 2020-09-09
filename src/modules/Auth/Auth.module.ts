import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import oauth from '../../config/oauth';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './Auth.controller';
import AuthService from './Auth.service';

@Module({
  imports: [
    ConfigModule.forFeature(oauth),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}