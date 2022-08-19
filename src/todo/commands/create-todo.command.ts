import { CreateTodoDto } from "../dto";

export class CreateTodoCommand {
  constructor(
    public readonly userId: number,
    public readonly createTodoDto: CreateTodoDto
  ) { }
}
