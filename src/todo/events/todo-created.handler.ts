import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { TodoCreatedEvent } from "./todo-created.event";

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler {
  handle({ todoGuid }: TodoCreatedEvent) {
    // console.log('Todo was created', { todoGuid });
  }
}
