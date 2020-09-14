import { Module } from "@nestjs/common";
import UserService from './User.service';
import { UserController } from './User.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export default class UserModule {}