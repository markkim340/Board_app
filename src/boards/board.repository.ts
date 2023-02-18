import { User } from './../auth/user.entity';
import { BoardStatus } from './entities/board-status.enum';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards(): Promise<Array<Board[] | number>> {
    try {
      return await this.findAndCount({
        select: { user: { nickname: true } },
        where: { status: BoardStatus.PUBLIC, deletedAt: null },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserBoards(user: User): Promise<Board[]> {
    try {
      return await this.find({
        select: {
          user: { nickname: true },
        },
        where: { user: { id: user.id }, deletedAt: null },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBoardsByContent(content: string): Promise<Board[]> {
    try {
      return await this.find({
        select: { user: { nickname: true } },
        where: {
          content: Like(`%${content}%`),
          status: BoardStatus.PUBLIC,
          deletedAt: null,
        },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  createBoard(
    title: string,
    content: string,
    status: BoardStatus,
    file: string,
    user: User,
  ): void {
    try {
      const board = this.create({
        title,
        content,
        status,
        file,
        user,
      });

      this.save(board);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBoardById(id: number): Promise<Board> {
    try {
      return await this.findOne({ where: { id }, relations: ['user'] });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteBoardById(id: number, user: User) {
    try {
      return await this.createQueryBuilder('board')
        .leftJoin('board.user', 'user')
        .where('board.id = :id', { id })
        .andWhere('user.id = :userid', { userid: user.id })
        .delete()
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
