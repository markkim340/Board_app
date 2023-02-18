import { BoardStatus } from './../entities/board-status.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  status: BoardStatus;
}
