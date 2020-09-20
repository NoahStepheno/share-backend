import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import Article from '../Article/entity'

@Entity()
export default class Collection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => User)
  @JoinColumn()
  author: User

  @OneToMany(
    () => Article,
    article => article.collection,
  )
  @JoinColumn()
  articles: Article[]

  @Column({ default: false })
  isDeleted: boolean
}