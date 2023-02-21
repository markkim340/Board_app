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
exports.AuthService = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(createUserDto) {
        const { email, nickname, password } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return await this.userRepository.createUser(email, nickname, hashedPassword);
    }
    async signIn(signInUserDto) {
        const { email, password } = signInUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: { password },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { access_token: accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('logIn failed');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map