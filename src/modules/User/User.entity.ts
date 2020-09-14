import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nickname: string

  @Column()
  avatar: string

  @Column()
  githubID: number

  @Column()
  email: string

  @Column({ default: true })
  isActive: boolean
}