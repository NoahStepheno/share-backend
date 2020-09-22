import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/Auth.module';
import UserModule from './modules/User/User.module';
import CollectionModule from './modules/Collection/module';
import ArticleModule from './modules/Article/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.join(__dirname, '..', 'env/.env'),
        path.join(__dirname, '..', `env/${process.env.NODE_ENV}.env`)
      ],
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "192.168.99.101",
      port: 31345,
      username: "root",
      password: "password",
      database: "share",
      entities: [
        "dist/**/*.entity{.ts,.js}",
        "dist/**/entity{.ts,.js}"
      ],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    CollectionModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
