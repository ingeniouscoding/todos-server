import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { TodoFactory } from "../todo.factory";
import { CreateTodoCommand } from "./create-todo.command";

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand>{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly todoFactory: TodoFactory
  ) { }

  async execute({ userId, createTodoDto }: CreateTodoCommand): Promise<void> {
    const { content, guid } = createTodoDto;
    const todo = this.eventPublisher.mergeObjectContext(
      await this.todoFactory.create(userId, guid, content)
    );
    todo.commit();
  }
}
