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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const swagger_1 = require("@nestjs/swagger");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    createComment(createCommentDto, user) {
        return this.commentsService.createComment(createCommentDto, user);
    }
    updateComment(updateCommentDto, user) {
        return this.commentsService.updateComment(updateCommentDto, user);
    }
    deleteCommnet(id, user) {
        return this.commentsService.deleteCommnet(id, user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 생성' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '댓글 생성 성공' }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 수정' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '댓글 수정 성공' }),
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_dto_1.UpdateCommentDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "updateComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: '댓글 삭제 성공' }),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteCommnet", null);
CommentsController = __decorate([
    (0, swagger_1.ApiTags)('comments'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server Error' }),
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map