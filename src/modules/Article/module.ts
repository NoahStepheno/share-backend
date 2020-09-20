import { Module } from "@nestjs/common";
import ArticleController from "./controller";
import UserModule from "../User/User.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import Article from "./entity";
import ArticleService from "./service";
import ArticleModel from "./model";
import CollectionModule from "../Collection/module";

@Module({
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleModel,
  ],
  imports: [
    TypeOrmModule.forFeature([Article]),
    UserModule,
    CollectionModule
  ],
  exports: [ArticleService]
})
export default class ArticleModule {}