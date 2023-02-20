import { CreateBoardDto } from './create-board.dto';
import { PartialType } from '@nestjs/mapped-types';
import { BoardStatus } from '../entities/board-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({
    example: '수정할게요',
    description: '수정할 제목',
  })
  title: string;

  @ApiProperty({
    example: '모집이 마감되었습니다.',
    description: '수정할 내용',
  })
  content: string;

  @ApiProperty({
    example: '',
    description: '파일을 첨부할 경우 / 없을 경우 null',
  })
  file: string;

  @ApiProperty({
    example: 'private',
    description: 'public-공개 / private-비공개',
  })
  status: BoardStatus;
}
