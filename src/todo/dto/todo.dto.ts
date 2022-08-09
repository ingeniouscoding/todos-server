import { Todo } from "@prisma/client";

export class TodoDto {
  id: string;
  content: string;
  isComplete: boolean;

  constructor(todo: Todo) {
    this.id = todo.id.toString();
    this.content = todo.content;
    this.isComplete = todo.isComplete;
  }
}
