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
exports.AuthController = void 0;
const signin_user_dto_1 = require("./dto/signin-user.dto");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(createUserDto) {
        return this.authService.signUp(createUserDto);
    }
    signIn(signInUserDto) {
        return this.authService.signIn(signInUserDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '회원가입 성공' }),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiCreatedResponse)({
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzb3J5NTMzOUBnbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTY0NzgyMjQxMCwiZXhwIjoxNjQ3ODIyNDcwfQ.NpWT0a2VxTLPqbl3ZHwqlNYh4Rwwhv0p0WWgUpaY3CE',
            },
            description: '로그인 성공',
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_user_dto_1.SignInUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server Error' }),
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map