import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    board: Board;
}
