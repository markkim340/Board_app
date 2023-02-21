import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/user.entity';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(createCommentDto: CreateCommentDto, user: User): Promise<void>;
    updateComment(updateCommentDto: UpdateCommentDto, user: User): Promise<void>;
    deleteCommnet(id: number, user: User): Promise<object>;
}
