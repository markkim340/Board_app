import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  // const port = configService.get<string>('server.port');
  const serverConfig = config.get<any>('server');

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,c
  //   }),
  // );

  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}

bootstrap();
