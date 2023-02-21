/// <reference types="multer" />
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from './../auth/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    getAllBoards(): Promise<Array<Board[] | number>>;
    getBoardById(id: number): Promise<Board>;
    getBoardsByContent(content: string): Promise<Board[]>;
    getUserBoards(user: User): Promise<Board[]>;
    createBoard(files: Express.Multer.File[], createBoardDto: CreateBoardDto, user: User): void;
    deleteBoardById(id: number, user: User): Promise<void>;
    updateBoardById(id: number, updateBoardDto: UpdateBoardDto, user: User): Promise<Board>;
}
