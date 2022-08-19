import { BadRequestException } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";

export class Todo extends AggregateRoot {
  constructor(
    private readonly userId: number,
    private readonly guid: string,
    private content: string,
    private isComplete: boolean
  ) {
    super();
  }

  getUserId(): number {
    return this.userId;
  }

  getGuid(): string {
    return this.guid;
  }

  getContent(): string {
    return this.content;
  }

  getIsComplete(): boolean {
    return this.isComplete;
  }

  complete(): void {
    if (this.isComplete) {
      throw new BadRequestException('Todo is already complete');
    }
    this.isComplete = true;
  }

  uncomplete(): void {
    if (!this.isComplete) {
      throw new BadRequestException('Todo is not complete yet');
    }
    this.isComplete = false;
  }
}
