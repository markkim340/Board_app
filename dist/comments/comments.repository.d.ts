import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
export declare class CommentRepository extends Repository<Comment> {
    private dataSource;
    constructor(dataSource: DataSource);
    createComment(board: Board, content: string, user: User): Promise<void>;
}
