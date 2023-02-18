import { PartialType } from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './entities/board-status.enum';
import { BoardsService } from './boards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Array<Board[] | number>> {
    return this.boardsService.getAllBoards();
  }

  @Get(':search')
  getBoardsByContent(@Param('search') content: string): Promise<Board[]> {
    return this.boardsService.getBoardsByContent(content);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  getUserBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getUserBoards(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): void {
    this.logger.verbose(`User ${user.email} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.updateBoardById(id, updateBoardDto, user);
  }
}
