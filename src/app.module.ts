import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TodoModule } from './todo/todo.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    HomeModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule { }
