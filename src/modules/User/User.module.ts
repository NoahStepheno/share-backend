
import { Module } from "@nestjs/common";
import oauth from '../../config/oauth';
import { ConfigModule } from '@nestjs/config';
import UserService from './User.service';
import { UserController } from './User.controller';

@Module({
  imports: [
    ConfigModule.forFeature(oauth),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export default class UserModule {}