import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
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
  UseGuards,
} from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({ summary: '게시판 전체 글 가져오기' })
  @Get()
  getAllBoards(): Promise<Array<Board[] | number>> {
    return this.boardsService.getAllBoards();
  }

  @ApiOperation({ summary: '작성 내용으로 게시글 검색하기' })
  @Get(':search')
  getBoardsByContent(@Param('search') content: string): Promise<Board[]> {
    return this.boardsService.getBoardsByContent(content);
  }

  @ApiOperation({ summary: '로그인한 유저의 게시글 가져오기' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: '로그인 후 이용가능.' })
  @Get('/user')
  @UseGuards(AuthGuard())
  getUserBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getUserBoards(user);
  }

  @ApiOperation({ summary: '게시글 작성하기' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '게시글 작성완료' })
  @ApiUnauthorizedResponse({ description: '로그인 후 이용가능.' })
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

  @ApiOperation({ summary: '게시글 삭제하기' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '게시글 삭제완료' })
  @ApiUnauthorizedResponse({ description: '로그인 후 이용가능.' })
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @ApiOperation({ summary: '게시글 수정하기' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '게시글 수정완료' })
  @ApiUnauthorizedResponse({ description: '로그인 후 이용가능.' })
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
