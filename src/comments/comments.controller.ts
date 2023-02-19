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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @Patch()
  @UseGuards(AuthGuard())
  updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.updateComment(updateCommentDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteCommnet(@Param() id: number, @GetUser() user: User): void {
    this.commentsService.deleteCommnet(id, user);
  }
}
