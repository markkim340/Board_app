import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { BoardRepository } from 'src/boards/boards.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, BoardRepository],
})
export class CommentsModule {}
