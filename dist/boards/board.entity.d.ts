import { User } from './../auth/user.entity';
import { BoardStatus } from './entities/board-status.enum';
import { BaseEntity } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { BoardLikes } from './boardLikes.entity';
export declare class Board extends BaseEntity {
    id: number;
    title: string;
    content: string;
    file: string;
    status: BoardStatus;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    comments: Comment[];
    likes: BoardLikes[];
}
