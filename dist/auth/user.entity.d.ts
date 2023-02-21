import { Board } from './../boards/board.entity';
import { BaseEntity } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { BoardLikes } from 'src/boards/boardLikes.entity';
export declare class User extends BaseEntity {
    id: number;
    email: string;
    nickname: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    boards: Board[];
    comments: Comment[];
    likes: BoardLikes[];
}
