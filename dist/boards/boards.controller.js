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
exports.BoardsController = void 0;
const swagger_1 = require("@nestjs/swagger");
const update_board_dto_1 = require("./dto/update-board.dto");
const user_entity_1 = require("./../auth/user.entity");
const passport_1 = require("@nestjs/passport");
const create_board_dto_1 = require("./dto/create-board.dto");
const boards_service_1 = require("./boards.service");
const common_1 = require("@nestjs/common");
const board_status_validation_pipe_1 = require("./pipes/board-status-validation.pipe");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
try {
    fs.readdirSync('uploads');
}
catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
        this.logger = new common_1.Logger('BoardsController');
    }
    getAllBoards() {
        return this.boardsService.getAllBoards();
    }
    getBoardsByContent(content) {
        console.log(content);
        return this.boardsService.getBoardsByContent(content);
    }
    getUserBoards(user) {
        return this.boardsService.getUserBoards(user);
    }
    getBoardById(id) {
        console.log('여기');
        return this.boardsService.getBoardById(id);
    }
    createBoard(files, createBoardDto, user) {
        this.logger.verbose(`UserId ${user.id} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
        return this.boardsService.createBoard(files, createBoardDto, user);
    }
    deleteBoardById(id, user) {
        return this.boardsService.deleteBoardById(id, user);
    }
    updateBoardById(id, updateBoardDto, user) {
        return this.boardsService.updateBoardById(id, updateBoardDto, user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시글 전체 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAllBoards", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '작성 내용으로 게시글 검색' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공' }),
    (0, common_1.Get)('search/:search'),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardsByContent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인한 유저의 게시글 조회' }),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getUserBoards", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시글 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시글 작성' }),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiCreatedResponse)({ description: '게시글 작성완료' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 10, {
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, 'uploads/');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)(board_status_validation_pipe_1.BoardStatusValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_board_dto_1.CreateBoardDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "createBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시글 삭제' }),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiResponse)({ status: 204, description: '게시글 삭제완료' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "deleteBoardById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시글 수정' }),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiCreatedResponse)({ description: '게시글 수정완료' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(board_status_validation_pipe_1.BoardStatusValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_dto_1.UpdateBoardDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "updateBoardById", null);
BoardsController = __decorate([
    (0, swagger_1.ApiTags)('Boards'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server Error' }),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map