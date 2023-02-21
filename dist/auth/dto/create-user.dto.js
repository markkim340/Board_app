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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@gmail.com',
        description: '4자리 이상 20자리 이하의 이메일 형식',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'testman',
        description: '4자리 이상 20자리 이하의 문자',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test1234@',
        description: '8자리 이상 16자리 이하의 비밀번호 형식',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Matches)(/^[A-Za-z\d@$!%*?&]{8,16}$/, {
        message: '비밀번호 양식에 맞게 작성하세요.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map