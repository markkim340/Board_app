import { User } from './../auth/user.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardStatus } from './entities/board-status.enum';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardsService');
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Array<Board[] | number>> {
    return await this.boardRepository.getAllBoards();
  }

  async getUserBoards(user: User): Promise<Board[]> {
    this.logger.verbose(`UserId ${user.id} trying to get all boards.`);
    return await this.boardRepository.getUserBoards(user);
  }

  async getBoardsByContent(content: string): Promise<Board[]> {
    const foundBoard = await this.boardRepository.getBoardsByContent(content);

    if (foundBoard.length === 0) {
      throw new NotFoundException(`Can't find Board with content ${content}`);
    }
    return foundBoard;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): void {
    this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    const { title, content } = createBoardDto;

    this.boardRepository.createBoard(title, content, user);
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const foundBoard = await this.boardRepository.getBoardById(id);
    if (foundBoard.length === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    const deleteBoardById = await this.boardRepository.deleteBoardById(
      id,
      user,
    );

    if (deleteBoardById.affected === 0) throw new UnauthorizedException();
  }

  // async updateBoardById(id: number, status: BoardStatus): Promise<Board> {
  //   const board = await this.getBoardById(id);
  //   board.status = status;
  //   await this.boardRepository.save(board);

  //   return board;
  // }
}
