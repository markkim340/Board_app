import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
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
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

@ApiTags('Boards')
@ApiResponse({ status: 500, description: 'Server Error' })
@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({ summary: '게시글 전체 조회' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @Get()
  getAllBoards(): Promise<Array<Board[] | number>> {
    return this.boardsService.getAllBoards();
  }

  @ApiOperation({ summary: '게시글 조회' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @ApiOperation({ summary: '작성 내용으로 게시글 검색' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @Get('search/:search')
  getBoardsByContent(@Param('search') content: string): Promise<Board[]> {
    console.log(content);
    return this.boardsService.getBoardsByContent(content);
  }

  @ApiOperation({ summary: '로그인한 유저의 게시글 조회' })
  @ApiBearerAuth('access_token')
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('/user')
  @UseGuards(AuthGuard())
  getUserBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getUserBoards(user);
  }

  @ApiOperation({ summary: '게시글 작성' })
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '게시글 작성완료' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @UseGuards(AuthGuard())
  createBoard(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(BoardStatusValidationPipe) createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): void {
    this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(files, createBoardDto, user);
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiBearerAuth('access_token')
  @ApiResponse({ status: 204, description: '게시글 삭제완료' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '게시글 수정완료' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
