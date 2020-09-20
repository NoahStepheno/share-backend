import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import Article from './entity'
import { Repository } from "typeorm"

@Injectable()
export default class ArticleModel {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async findOne (id: number) {
    return await this.articleRepository.findOne(id)
  }

  async find (...args) {
    return await this.articleRepository.find(...args)
  }

  async create(article: Article) {
    return this.articleRepository.save(article)
  }

  async update(article: Article) {
    return this.articleRepository.save(article)
  }
} 