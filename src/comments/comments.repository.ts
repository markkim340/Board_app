import { BoardRepository } from './../boards/boards.repository';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createComment(
    board: Board,
    content: string,
    user: User,
  ): Promise<void> {
    try {
      const comment = new Comment();
      comment.board = board;
      comment.content = content;
      comment.user = user;

      this.save(comment);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
