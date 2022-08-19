import { CreateTodoHandler } from "./create-todo.handler";
import { RemoveTodoHandler } from "./remove-todo.handler";

export * from './create-todo.command';
export * from './remove-todo.command';

export const commandHandlers = [
  CreateTodoHandler,
  RemoveTodoHandler,
];
