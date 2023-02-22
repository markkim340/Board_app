"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path = require("path");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    console.log(configService.get('jwt.expiresIn'));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useStaticAssets(process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '..', '..', 'uploads')
        : path.join(__dirname, '..', 'uploads'), {
        prefix: '/uploads',
    });
    app.useStaticAssets(process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '..', '..', 'public')
        : path.join(__dirname, '..', 'public'), {
        prefix: '/dist',
    });
    const SwaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Board_app API Docs_Made By 김민우')
        .setDescription(`반갑습니다.\n
      주니어 백엔드 개발자 김민우의 미니 프로젝트 NestJS Board_app 개발을 위한 API 문서입니다. 
      로그인이 필요한 기능은 토큰을 발급받아 사용자 인증 후 이용바랍니다.`)
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'access_token')
        .build();
    const swaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };
    const document = swagger_1.SwaggerModule.createDocument(app, SwaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document, swaggerCustomOptions);
    const port = configService.get('server.port');
    await app.listen(port);
    common_1.Logger.log(`🔰 Application running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map