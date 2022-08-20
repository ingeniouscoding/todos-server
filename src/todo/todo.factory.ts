import { Injectable } from "@nestjs/common";

import { TodoCreatedEvent } from "./events";
import { Todo } from "./models";
import { TodoEntityRepository } from "./todo-entity.repository";

@Injectable()
export class TodoFactory {
  constructor(private todoEntityRepo: TodoEntityRepository) { }

  async create(userId: number, guid: string, content: string): Promise<Todo> {
    const todo = new Todo(userId, guid, content, false);
    await this.todoEntityRepo.create(todo);
    todo.apply(new TodoCreatedEvent(todo.getGuid()));
    return todo;
  }

  async findByGuid(guid: string): Promise<Todo> {
    const todoEntity = await this.todoEntityRepo.findByGuid(guid);
    return new Todo(
      todoEntity.userId,
      todoEntity.guid,
      todoEntity.content,
      todoEntity.isComplete
    );
  }
}
