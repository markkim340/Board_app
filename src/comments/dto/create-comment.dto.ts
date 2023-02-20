import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '모집 마감되었나요?',
    description: '댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: '1',
    description: '게시글 id',
  })
  @IsNotEmpty()
  @IsNumber()
  boardId: number;
}
