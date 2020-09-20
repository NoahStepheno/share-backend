import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import Collection from "./entity"

@Injectable()
export default class CollectionModel {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>
  ) {}

  async findOne (id: number) {
    return await this.collectionRepository.findOne(id)
  }

  async find (...args) {
    return await this.collectionRepository.find(...args)
  }

  async create(collection: Collection) {
    return this.collectionRepository.save(collection)
  }

  async update(collection: Collection) {
    return this.collectionRepository.save(collection)
  }
} 