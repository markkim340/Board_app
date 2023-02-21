import { CreateBoardDto } from './create-board.dto';
import { BoardStatus } from '../entities/board-status.enum';
declare const UpdateBoardDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBoardDto>>;
export declare class UpdateBoardDto extends UpdateBoardDto_base {
    title: string;
    content: string;
    file: string;
    status: BoardStatus;
}
export {};
