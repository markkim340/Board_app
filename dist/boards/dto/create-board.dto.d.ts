import { BoardStatus } from './../entities/board-status.enum';
export declare class CreateBoardDto {
    title: string;
    content: string;
    file: string;
    status: BoardStatus;
}
