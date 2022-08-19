import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PrismaService } from "src/prisma/prisma.service";
import { TodoReadModel } from "../dto";
import { AllTodosQuery } from "./all-todos.query";

@QueryHandler(AllTodosQuery)
export class AllTodosHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) { }

  async execute({ userId }: AllTodosQuery): Promise<TodoReadModel[]> {
    const todos = await this.prisma.todoEntity
      .findMany({
        where: {
          userId,
        },
      });

    return todos.map((t) => new TodoReadModel(
      t.guid,
      t.content,
      t.isComplete
    ));
  }
}
