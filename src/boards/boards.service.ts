import { User } from './../auth/user.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { BoardStatus } from './entities/board-status.enum';
import { Board } from './board.entity';
import { use } from 'passport';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardsService');
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async getAllUserBoards(user: User): Promise<Board[]> {
    this.logger.verbose(`UserId ${user.id} trying to get all boards.`);
    return await this.boardRepository.getAllUserBoards(user);
  }

  async getBoardsByContent(content: string): Promise<Board[]> {
    const found = await this.boardRepository.getBoardsByContent(content);

    if (found.length === 0) {
      throw new NotFoundException(`Can't find Board with content ${content}`);
    }

    return found;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    const { title, content } = createBoardDto;
    return this.boardRepository.createBoard(title, content, user);
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }

    console.log(result);
  }

  // async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
  //   const board = await this.getBoardById(id);
  //   board.status = status;
  //   await this.boardRepository.save(board);

  //   return board;
  // }
}
