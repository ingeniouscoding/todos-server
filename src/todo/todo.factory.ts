import { Injectable } from "@nestjs/common";

import { TodoCreatedEvent } from "./events";
import { Todo } from "./models";
import { TodoEntityRepository } from "./todo-entity.repository";

@Injectable()
export class TodoFactory {
  constructor(private todoEntityRepo: TodoEntityRepository) { }

  async create(
    userId: number,
    guid: string,
    content: string,
    isComplete: boolean = false
  ): Promise<Todo> {
    const todo = new Todo(userId, guid, content, isComplete);
    await this.todoEntityRepo.create(todo);
    todo.apply(new TodoCreatedEvent(todo.getGuid()));
    return todo;
  }
}
