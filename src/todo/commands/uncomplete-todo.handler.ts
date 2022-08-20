import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { NotOwnerException } from "../exceptions";
import { TodoEntityRepository } from "../todo-entity.repository";
import { TodoFactory } from "../todo.factory";
import { UncompleteTodoCommand } from "./uncomplete-todo.command";

@CommandHandler(UncompleteTodoCommand)
export class UncompleteTodoHandler implements ICommandHandler {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly todoFactory: TodoFactory,
    private readonly todoEntityRepo: TodoEntityRepository
  ) { }

  async execute({ userId, guid }: UncompleteTodoCommand): Promise<void> {
    const todo = this.eventPublisher.mergeObjectContext(
      await this.todoFactory.findByGuid(guid)
    );

    if (todo.getUserId() !== userId) {
      throw new NotOwnerException();
    }

    todo.uncomplete();
    await this.todoEntityRepo.update(todo);
    todo.commit();
  }
}
