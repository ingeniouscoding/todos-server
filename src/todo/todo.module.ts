import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { commandHandlers } from './commands';
import {
  CompleteTodoController,
  ReadTodoController,
  UpdateTodoController
} from './controllers';
import { eventHandlers } from './events';
import { queryHandlers } from './queries';
import { TodoEntityRepository } from './todo-entity.repository';
import { TodoFactory } from './todo.factory';

@Module({
  imports: [CqrsModule],
  controllers: [
    ReadTodoController,
    UpdateTodoController,
    CompleteTodoController,
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    TodoEntityRepository,
    TodoFactory,
  ],
})
export class TodoModule { }
