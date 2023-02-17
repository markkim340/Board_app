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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoardsByContent(@Query('search') content: string): Promise<Board[]> {
    return this.boardsService.getBoardsByContent(content);
  }

  @Get()
  async getAllBoards() {
    return await this.boardsService.getAllBoards();
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getAllUserBoards(@GetUser() user: User): Promise<Board[]> {
    return await this.boardsService.getAllUserBoards(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    this.logger.verbose(`User ${user.email} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoardById(id, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Promise<Board> {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
