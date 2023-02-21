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
exports.CommentsService = void 0;
const comments_repository_1 = require("./comments.repository");
const common_1 = require("@nestjs/common");
const boards_repository_1 = require("../boards/boards.repository");
let CommentsService = class CommentsService {
    constructor(commentRepository, boardRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }
    async createComment(createCommentDto, user) {
        const { boardId, content } = createCommentDto;
        const board = await this.boardRepository.findOneBy({ id: boardId });
        if (!board) {
            throw new common_1.NotFoundException(`Board ${boardId} not found`);
        }
        this.commentRepository.createComment(board, content, user);
    }
    async updateComment(updateCommentDto, user) {
        const { id, content } = updateCommentDto;
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`comment ${id} not found`);
        }
        else if (comment.user.id !== user.id)
            throw new common_1.UnauthorizedException();
        comment.content = content;
        this.commentRepository.save(comment);
    }
    async deleteCommnet(id, user) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`comment ${id} not found`);
        }
        else if (comment.user.id !== user.id)
            throw new common_1.UnauthorizedException();
        return this.commentRepository.delete(id);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentRepository,
        boards_repository_1.BoardRepository])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map