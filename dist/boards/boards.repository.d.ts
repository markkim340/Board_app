import { User } from '../auth/user.entity';
import { BoardStatus } from './entities/board-status.enum';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
    getAllBoards(): Promise<Array<Board[] | number>>;
    getUserBoards(user: User): Promise<Board[]>;
    getBoardsByContent(content: string): Promise<Board[]>;
    createBoard(title: string, content: string, status: BoardStatus, file: string, user: User): void;
    getBoardById(id: number): Promise<Board>;
    deleteBoardById(id: number, user: User): Promise<import("typeorm").DeleteResult>;
}
