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
exports.UpdateBoardDto = void 0;
const create_board_dto_1 = require("./create-board.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
const board_status_enum_1 = require("../entities/board-status.enum");
const swagger_1 = require("@nestjs/swagger");
class UpdateBoardDto extends (0, mapped_types_1.PartialType)(create_board_dto_1.CreateBoardDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '수정할게요',
        description: '수정할 제목',
    }),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '모집이 마감되었습니다.',
        description: '수정할 내용',
    }),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
        description: '파일을 첨부할 경우 / 없을 경우 null',
    }),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'private',
        description: 'public-공개 / private-비공개',
    }),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "status", void 0);
exports.UpdateBoardDto = UpdateBoardDto;
//# sourceMappingURL=update-board.dto.js.map