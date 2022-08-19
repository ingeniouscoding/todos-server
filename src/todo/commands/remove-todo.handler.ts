import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { PrismaService } from "src/prisma/prisma.service";
import { NotOwnerException, TodoNotFoundException } from "../exceptions";
import { RemoveTodoCommand } from "./remove-todo.command";

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler {
  constructor(private readonly prisma: PrismaService) { }

  async execute({ userId, guid }: RemoveTodoCommand): Promise<void> {
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

    await this.prisma.todoEntity
      .delete({
        where: {
          guid,
        },
      });
  }
}