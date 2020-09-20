import { Injectable } from "@nestjs/common"
import Collection from './entity';
import { CollectionDto } from './dto';
import UserService from "../User/User.service";
import CollectionModel from "./model";
// import ArticleService from "../Article/service";

@Injectable()
export default class CollectionService {
  constructor(
    private readonly userService: UserService,
    private readonly collectionModel: CollectionModel,
    // private readonly articleService: ArticleService,
  ) {}

  async create(collectionDto: CollectionDto, userID: number) {
    const user = await this.userService.findOne(userID)
    const collection = new Collection()
    collection.author = user
    collection.name = collectionDto.name
    await this.collectionModel.create(collection)
  }

  async update(collectionDto: CollectionDto) {
    const collection = await this.collectionModel.findOne(collectionDto.id)
    collection.name = collectionDto.name
    collection.isDeleted = collectionDto.isDeleted || false
    await this.collectionModel.update(collection)
  }

  async findOne(id: number) {
    return this.collectionModel.findOne(id)
  }

  async getList(userId: number) {
    const list = await this.collectionModel.find({ author: { id: userId }, isDeleted: false })
    return list
  }

  async save(collection: Collection) {
    await this.collectionModel.update(collection)
  }
} 