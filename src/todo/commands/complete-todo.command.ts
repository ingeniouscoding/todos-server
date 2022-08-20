export class CompleteTodoCommand {
  constructor(
    public readonly userId: number,
    public readonly guid: string
  ) { }
}
