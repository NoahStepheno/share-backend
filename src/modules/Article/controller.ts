import { Controller, UseGuards, Post, Param, Req, Get, Put, Body, Delete } from "@nestjs/common";
import ArticleService from "./service";
import { AuthGuard } from "@nestjs/passport";
import { ArticleDto } from './dto';

@Controller('article')
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('collection')
  async getCollection(
    @Req() req,
  ) {
    const result = await this.articleService.getCollections(req.user.userId)
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:collectionId')
  async create(
    @Param() param: { collectionId: number },
    @Req() req,
  ) {
    return await this.articleService.create(param.collectionId, req.user.userId)
  }

  @Get('/:id')
  async get(
    @Param() param: { id: number }
  ) {
    return this.articleService.findOne(param.id)
  }

  @Put('/:id')
  async update(
    @Body() articleDto: ArticleDto
  ) {
    await this.articleService.update(articleDto)
    return
  }

  @Delete('/:id')
  async delete(
    @Param() param: { id: number }
  ) {
    await this.articleService.delete(param.id)
    return
  }
}