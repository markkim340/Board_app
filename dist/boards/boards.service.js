"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const boards_repository_1 = require("./boards.repository");
const common_1 = require("@nestjs/common");
let BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
        this.logger = new common_1.Logger('BoardsService');
    }
    async getAllBoards() {
        return await this.boardRepository.getAllBoards();
    }
    async getBoardById(id) {
        const board = await this.boardRepository.getBoardById(id);
        if (!board)
            throw new common_1.NotFoundException(`Can't find board with id ${id}`);
        board.views++;
        await this.boardRepository.save(board);
        return board;
    }
    async getUserBoards(user) {
        this.logger.verbose(`UserId ${user.id} trying to get all boards.`);
        return await this.boardRepository.getUserBoards(user);
    }
    async getBoardsByContent(content) {
        const foundBoard = await this.boardRepository.getBoardsByContent(content);
        if (foundBoard.length === 0) {
            throw new common_1.NotFoundException(`Can't find Board with content ${content}`);
        }
        return foundBoard;
    }
    createBoard(files, createBoardDto, user) {
        this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
        const { title, content, status } = createBoardDto;
        const file = files ? files[0].path : null;
        return this.boardRepository.createBoard(title, content, status, file, user);
    }
    async deleteBoardById(id, user) {
        const foundBoard = await this.boardRepository.getBoardById(id);
        if (!foundBoard) {
            throw new common_1.NotFoundException(`Can't find board with id ${id}`);
        }
        const deleteBoardById = await this.boardRepository.deleteBoardById(id, user);
        if (deleteBoardById.affected === 0)
            throw new common_1.UnauthorizedException();
    }
    async updateBoardById(id, updateBoardDto, user) {
        const board = await this.boardRepository.getBoardById(id);
        if (board.user.id !== user.id)
            throw new common_1.UnauthorizedException();
        const { title, content, status } = updateBoardDto;
        if (title)
            board.title = title;
        if (content)
            board.content = content;
        if (status)
            board.status = status;
        return await this.boardRepository.save(board);
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [boards_repository_1.BoardRepository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map