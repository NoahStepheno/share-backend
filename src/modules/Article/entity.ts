import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from '../User/User.entity';
import Collection from "../Collection/entity";

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @ManyToOne(() => User)
  @JoinColumn()
  author: User

  @ManyToOne(
    () => Collection,
    collection => collection.articles,
    {
      cascade: true
    }
  )
  @JoinColumn()
  collection: Collection

  @Column()
  isDeleted: boolean

  @CreateDateColumn()
  created: string

  @UpdateDateColumn()
  updated: string
}