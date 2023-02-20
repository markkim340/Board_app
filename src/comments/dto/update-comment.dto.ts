import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: '5',
    description: '댓글 id',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '응~수정~',
    description: '수정할 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
