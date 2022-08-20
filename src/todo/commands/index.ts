import { CompleteTodoHandler } from "./complete-todo.handler";
import { CreateTodoHandler } from "./create-todo.handler";
import { RemoveTodoHandler } from "./remove-todo.handler";
import { UncompleteTodoHandler } from "./uncomplete-todo.handler";

export * from './create-todo.command';
export * from './remove-todo.command';
export * from './complete-todo.command';
export * from './uncomplete-todo.command';

export const commandHandlers = [
  CreateTodoHandler,
  RemoveTodoHandler,
  CompleteTodoHandler,
  UncompleteTodoHandler
];
