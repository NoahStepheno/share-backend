import { Injectable } from "@nestjs/common"
import Article from './entity'
import ArticleModel from "./model"
import UserService from "../User/User.service"
import CollectionService from "../Collection/service"
import { ArticleDto } from "./dto"

@Injectable()
export default class ArticleService {
  constructor(
    private readonly articleModel: ArticleModel,
    private readonly userService: UserService,
    private readonly collectionService: CollectionService
  ) {}

  async create(collectionId: number, userID: number) {
    const author = await this.userService.findOne(userID)
    const collection = await this.collectionService.findOne(collectionId)
    const article = new Article() 
    article.author = author
    article.collection = collection
    return await this.articleModel.create(article)
  }

  async findOne(id: number) {
    return await this.articleModel.findOne(id)
  }

  async find(...args) {
    return await this.articleModel.find(...args)
  }

  async update(articleDto: ArticleDto) {
    const article = await this.findOne(articleDto.id)
    article.title = articleDto.title
    article.content = articleDto.content
    return await this.articleModel.update(article)
  }

  async delete(id: number) {
    const article = await this.findOne(id)
    article.isDeleted = true
    return await this.articleModel.update(article)
  }

  async getCollections(userId: number) {
    const list = await this.collectionService.getList(userId)
    return await Promise.all(list.map(async item => {
      const result = await this.find({ collection: item, isDeleted: false })
      return {
        ...item,
        articles: result
      }
    }))
  }
} 