import { User } from './../auth/user.entity';
import { BoardStatus } from './entities/board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards() {
    try {
      return await this.createQueryBuilder('board')
        .select([
          'board.id',
          'board.title',
          'board.content',
          'user.email',
          'user.nickname',
          'board.createdAt',
        ])
        .leftJoin('board.user', 'user')
        .where('status = PUBLIC')
        .where('board.deletedAt IS NULL')
        .orderBy('board.createdAt', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllUserBoards(user): Promise<Board[]> {
    try {
      return await this.createQueryBuilder('board')
        .where('board.userId = :userId', { userId: user.id })
        .where('status = PUBLIC')
        .where('board.deletedAt IS NULL')
        .orderBy('board.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBoardsByContent(content: string): Promise<Board[]> {
    try {
      return await this.createQueryBuilder('board')
        .where('status = PUBLIC')
        .where('content LIKE :content', { content: `%${content}%` })
        .where('board.deletedAt IS NULL')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createBoard(title, content, user: User): Promise<Board> {
    try {
      const board = this.create({
        title,
        content,
        status: BoardStatus.PUBLIC,
        user,
      });

      await this.save(board);
      return board;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
