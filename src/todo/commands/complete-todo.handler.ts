import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { NotOwnerException } from "../exceptions";
import { TodoEntityRepository } from "../todo-entity.repository";
import { TodoFactory } from "../todo.factory";
import { CompleteTodoCommand } from "./complete-todo.command";

@CommandHandler(CompleteTodoCommand)
export class CompleteTodoHandler implements ICommandHandler {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly todoFactory: TodoFactory,
    private readonly todoEntityRepo: TodoEntityRepository
  ) { }

  async execute({ userId, guid }: CompleteTodoCommand): Promise<void> {
    const todo = this.eventPublisher.mergeObjectContext(
      await this.todoFactory.findByGuid(guid)
    );

    if (todo.getUserId() !== userId) {
      throw new NotOwnerException();
    }

    todo.complete();
    await this.todoEntityRepo.update(todo);
    todo.commit();
  }
}
