import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('combined') },
  ],
})
export class AppModule {}
