import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from './../entities/board-status.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '백엔드 스터디 모집합니다.',
    description: '제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '반갑습니다. 취업까지 함께하실 착하고 열정적인 분들을 모집합니다.',
    description: '내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'public',
    description: 'public-공개 / private-비공개',
  })
  @IsNotEmpty()
  @IsString()
  status: BoardStatus;
}
