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
exports.Board = void 0;
const user_entity_1 = require("./../auth/user.entity");
const board_status_enum_1 = require("./entities/board-status.enum");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../comments/entities/comment.entity");
const boardLikes_entity_1 = require("./boardLikes.entity");
let Board = class Board extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Board.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Board.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Board.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.boards, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => boardLikes_entity_1.BoardLikes, (likes) => likes.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "likes", void 0);
Board = __decorate([
    (0, typeorm_1.Entity)()
], Board);
exports.Board = Board;
//# sourceMappingURL=board.entity.js.map