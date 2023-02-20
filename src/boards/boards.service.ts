import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from './../auth/user.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardsService');
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Array<Board[] | number>> {
    return await this.boardRepository.getAllBoards();
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.getBoardById(id);
    if (!board) throw new NotFoundException(`Can't find board with id ${id}`);

    board.views++;
    await this.boardRepository.save(board);

    return board;
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

  createBoard(
    files: Express.Multer.File[],
    createBoardDto: CreateBoardDto,
    user: User,
  ): void {
    this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    const { title, content, status } = createBoardDto;

    const file = files ? files[0].path : null;

    return this.boardRepository.createBoard(title, content, status, file, user);
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const foundBoard = await this.boardRepository.getBoardById(id);
    if (!foundBoard) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    const deleteBoardById = await this.boardRepository.deleteBoardById(
      id,
      user,
    );

    if (deleteBoardById.affected === 0) throw new UnauthorizedException();
  }

  async updateBoardById(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user,
  ): Promise<Board> {
    const board = await this.boardRepository.getBoardById(id);
    if (board.user.id !== user.id) throw new UnauthorizedException();

    const { title, content, status } = updateBoardDto;
    if (title) board.title = title;
    if (content) board.content = content;
    if (status) board.status = status;

    return await this.boardRepository.save(board);
  }
}
