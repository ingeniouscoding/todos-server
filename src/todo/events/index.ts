import { TodoCreatedHandler } from "./todo-created.handler";

export * from './todo-created.event';

export const eventHandlers = [
  TodoCreatedHandler,
]
