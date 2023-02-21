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
exports.BoardRepository = void 0;
const board_status_enum_1 = require("./entities/board-status.enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_entity_1 = require("./board.entity");
let BoardRepository = class BoardRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(board_entity_1.Board, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getAllBoards() {
        try {
            return await this.findAndCount({
                select: {
                    user: { nickname: true },
                    comments: { content: true },
                },
                where: { status: board_status_enum_1.BoardStatus.PUBLIC, deletedAt: null },
                relations: ['user', 'comments'],
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUserBoards(user) {
        try {
            return await this.find({
                select: {
                    user: { nickname: true },
                },
                where: { user: { id: user.id }, deletedAt: null },
                relations: ['user'],
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getBoardsByContent(content) {
        try {
            return await this.find({
                select: { user: { nickname: true } },
                where: {
                    content: (0, typeorm_1.Like)(`%${content}%`),
                    status: board_status_enum_1.BoardStatus.PUBLIC,
                    deletedAt: null,
                },
                relations: ['user'],
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    createBoard(title, content, status, file, user) {
        try {
            const board = this.create({
                title,
                content,
                status,
                file,
                views: 0,
                user,
            });
            this.save(board);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getBoardById(id) {
        try {
            return await this.findOne({
                where: { id },
                relations: ['user', 'comments', 'comments.user'],
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteBoardById(id, user) {
        try {
            return await this.createQueryBuilder('board')
                .leftJoin('board.user', 'user')
                .where('board.id = :id', { id })
                .andWhere('user.id = :userid', { userid: user.id })
                .delete()
                .execute();
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
BoardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BoardRepository);
exports.BoardRepository = BoardRepository;
//# sourceMappingURL=boards.repository.js.map