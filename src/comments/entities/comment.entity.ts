import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.comments, { eager: false })
  user: User;

  @ManyToOne(() => Board, (board) => board.comments, { eager: false })
  board: Board;
}
