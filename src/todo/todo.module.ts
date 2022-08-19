import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { commandHandlers } from './commands';
import { eventHandlers } from './events';
import { queryHandlers } from './queries';
import { TodoEntityRepository } from './todo-entity.repository';
import { TodoController } from './todo.controller';
import { TodoFactory } from './todo.factory';

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    TodoEntityRepository,
    TodoFactory,
  ],
})
export class TodoModule { }
