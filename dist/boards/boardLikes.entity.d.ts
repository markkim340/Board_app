import { User } from 'src/auth/user.entity';
import { BaseEntity } from 'typeorm';
import { Board } from './board.entity';
export declare class BoardLikes extends BaseEntity {
    id: number;
    boardId: string;
    userId: string;
    user: User;
    board: Board;
}
