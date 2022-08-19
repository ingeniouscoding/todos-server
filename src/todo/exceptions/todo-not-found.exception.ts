import { NotFoundException } from "@nestjs/common";

export class TodoNotFoundException extends NotFoundException {
  constructor() {
    super('Todo with this not found');
  }
}
