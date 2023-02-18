import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get<any>('server');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const SwaggerConfig = new DocumentBuilder()
    .setTitle('Board_app API Docs_Made By 김민우')
    .setDescription('반갑습니다. NestJS Board_app 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`🔰 Application running on port ${port}`);
}

bootstrap();
