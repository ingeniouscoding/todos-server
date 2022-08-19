import { AllTodosHandler } from './all-todos.handler';
import { FindTodoHandler } from './find-todo.handler';

export * from './all-todos.query';
export * from './find-todo.query';

export const queryHandlers = [
  AllTodosHandler,
  FindTodoHandler,
];
