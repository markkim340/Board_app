import { User } from './../auth/user.entity';
import { BoardStatus } from './entities/board-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { BoardLikes } from './boardLikes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  file: string;

  @Column()
  status: BoardStatus;

  @Column()
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.board, { cascade: true })
  comments: Comment[];

  @OneToMany(() => BoardLikes, (likes) => likes.board, { cascade: true })
  likes: BoardLikes[];
}
