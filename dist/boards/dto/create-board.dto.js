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
exports.CreateBoardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const board_status_enum_1 = require("./../entities/board-status.enum");
const class_validator_1 = require("class-validator");
class CreateBoardDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '백엔드 스터디 모집합니다.',
        description: '제목',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '반갑습니다. 취업까지 함께하실 착하고 열정적인 분들을 모집합니다.',
        description: '내용',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'smile.jpg',
        description: '파일을 첨부할 경우 / 없을 경우 null',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'public',
        description: 'public-공개 / private-비공개',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "status", void 0);
exports.CreateBoardDto = CreateBoardDto;
//# sourceMappingURL=create-board.dto.js.map