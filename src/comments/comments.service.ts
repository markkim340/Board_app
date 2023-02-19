import { CommentRepository } from './comments.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/user.entity';
import { BoardRepository } from 'src/boards/boards.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private readonly boardRepository: BoardRepository,
  ) {}
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<void> {
    const { boardId, content } = createCommentDto;
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException(`Board ${boardId} not found`);
    }

    this.commentRepository.createComment(board, content, user);
  }

  async updateComment(updateCommentDto: UpdateCommentDto, user: User) {
    const { id, content } = updateCommentDto;
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`comment ${id} not found`);
    } else if (comment.user.id !== user.id) throw new UnauthorizedException();

    comment.content = content;
    this.commentRepository.save(comment);
  }

  async deleteCommnet(id: number, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    console.log(comment);
    if (!comment) {
      throw new NotFoundException(`comment ${id} not found`);
    } else if (comment.user.id !== user.id) throw new UnauthorizedException();

    return this.commentRepository.delete(id);
  }
}
