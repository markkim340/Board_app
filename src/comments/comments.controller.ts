import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('comments')
@ApiUnauthorizedResponse({ description: '로그인 후 이용가능' })
@ApiResponse({ status: 500, description: 'Server Error' })
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '댓글 생성 성공' })
  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '댓글 수정 성공' })
  @Patch()
  @UseGuards(AuthGuard())
  updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.updateComment(updateCommentDto, user);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiBearerAuth('access_token')
  @ApiResponse({ status: 204, description: '댓글 삭제 성공' })
  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteCommnet(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<object> {
    return this.commentsService.deleteCommnet(id, user);
  }
}
