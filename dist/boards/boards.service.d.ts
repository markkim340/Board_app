/// <reference types="multer" />
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from './../auth/user.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
export declare class BoardsService {
    private boardRepository;
    private logger;
    constructor(boardRepository: BoardRepository);
    getAllBoards(): Promise<Array<Board[] | number>>;
    getBoardById(id: number): Promise<Board>;
    getUserBoards(user: User): Promise<Board[]>;
    getBoardsByContent(content: string): Promise<Board[]>;
    createBoard(files: Express.Multer.File[], createBoardDto: CreateBoardDto, user: User): void;
    deleteBoardById(id: number, user: User): Promise<void>;
    updateBoardById(id: number, updateBoardDto: UpdateBoardDto, user: any): Promise<Board>;
}
