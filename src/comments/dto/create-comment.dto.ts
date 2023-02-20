import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '댓글 폼 미쳤다!!',
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
