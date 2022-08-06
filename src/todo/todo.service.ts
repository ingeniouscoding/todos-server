import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos = [
    {
      content: 'Todo task 1',
      isComplete: false,
    },
    {
      content: 'Todo task 2',
      isComplete: false,
    },
    {
      content: 'Todo task 3',
      isComplete: true,
    },
  ];

  getAll() {
    return this.todos;
  }
}
