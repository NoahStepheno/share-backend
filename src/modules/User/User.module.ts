import { Module } from "@nestjs/common";
import UserService from './User.service';
import { UserController } from './User.controller';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export default class UserModule {}