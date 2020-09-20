import { Module } from "@nestjs/common";
import CollectionController from './controller';
import CollectionService from "./service";
import CollectionModel from './model';
import UserModule from "../User/User.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import Collection from './entity'
// import ArticleModule from "../Article/module";

@Module({
  controllers: [CollectionController],
  providers: [
    CollectionService,
    CollectionModel,
  ],
  imports: [
    UserModule,
    // ArticleModule,
    TypeOrmModule.forFeature([Collection])
  ],
  exports: [
    CollectionService
  ]
})
export default class CollectionModule {}
