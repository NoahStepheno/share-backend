import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/Auth.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    envFilePath: path.join(__dirname, '..', 'env/.env'),
    isGlobal:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
