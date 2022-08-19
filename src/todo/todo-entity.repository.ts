import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
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
}
