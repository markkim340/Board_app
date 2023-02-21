import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/user.entity';
import { BoardRepository } from 'src/boards/boards.repository';
export declare class CommentsService {
    private commentRepository;
    private readonly boardRepository;
    constructor(commentRepository: CommentRepository, boardRepository: BoardRepository);
    createComment(createCommentDto: CreateCommentDto, user: User): Promise<void>;
    updateComment(updateCommentDto: UpdateCommentDto, user: User): Promise<void>;
    deleteCommnet(id: number, user: User): Promise<import("typeorm").DeleteResult>;
}
