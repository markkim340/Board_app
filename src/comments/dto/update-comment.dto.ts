import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: '1',
    description: '댓글 id',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '등록 희망합니다',
    description: '수정할 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
