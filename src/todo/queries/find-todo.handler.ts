import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PrismaService } from "src/prisma/prisma.service";
import { TodoReadModel } from "../dto";
import { NotOwnerException, TodoNotFoundException } from "../exceptions";
import { FindTodoQuery } from "./find-todo.query";

@QueryHandler(FindTodoQuery)
export class FindTodoHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) { }

  async execute({ userId, guid }: FindTodoQuery): Promise<TodoReadModel> {
    const todo = await this.prisma.todoEntity
      .findUnique({
        where: {
          guid,
        },
      });

    if (todo === null) {
      throw new TodoNotFoundException();
    }

    if (todo.userId !== userId) {
      throw new NotOwnerException();
    }

    return new TodoReadModel(
      todo.guid,
      todo.content,
      todo.isComplete
    );
  }
}
