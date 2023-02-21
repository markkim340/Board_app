"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const boards_module_1 = require("./boards/boards.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const nest_morgan_1 = require("nest-morgan");
const core_1 = require("@nestjs/core");
const comments_module_1 = require("./comments/comments.module");
const config_2 = require("./config/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_morgan_1.MorganModule,
            config_1.ConfigModule.forRoot({ load: [config_2.default], isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            boards_module_1.BoardsModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: (0, nest_morgan_1.MorganInterceptor)('combined') },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map