import { Injectable } from "@nestjs/common";
import { TodoEntity } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";
import { TodoNotFoundException } from "./exceptions";
import { Todo } from "./models";

@Injectable()
export class TodoEntityRepository {
  constructor(private prisma: PrismaService) { }

  async create(todo: Todo): Promise<void> {
    await this.prisma.todoEntity
      .create({
        data: {
          guid: todo.getGuid(),
          content: todo.getContent(),
          userId: todo.getUserId(),
        },
      });
  }

  async findByGuid(guid: string): Promise<TodoEntity> {
    const todo = await this.prisma.todoEntity
      .findUnique({
        where: {
          guid,
        },
      });

    if (todo === null) {
      throw new TodoNotFoundException();
    }

    return todo;
  }

  async update(todo: Todo): Promise<void> {
    await this.prisma.todoEntity
      .update({
        where: {
          guid: todo.getGuid(),
        },
        data: {
          content: todo.getContent(),
          isComplete: todo.getIsComplete(),
        },
      });
  }
}
