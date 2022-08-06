import { Module } from '@nestjs/common';

import { TodoModule } from './todo/todo.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TodoModule, HomeModule],
})
export class AppModule { }
