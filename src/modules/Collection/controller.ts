import { Controller, UseGuards, Post, Req, Body, Get, Put } from "@nestjs/common";
import CollectionService from "./service";
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './dto';

@Controller('collection')
export default class CollectionController {
  constructor(
    private readonly collectionService: CollectionService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Req() req,
    @Body() collectionDto: CollectionDto
  ) {
    await this.collectionService.create(collectionDto, req.user.userId)
    return 
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(
    @Req() req,
  ) {
    const result = await this.collectionService.getList(req.user.userId)
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async edit(
    @Body() collectionDto: CollectionDto
  ) {
    await this.collectionService.update(collectionDto)
  }
}