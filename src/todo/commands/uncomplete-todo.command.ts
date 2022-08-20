export class UncompleteTodoCommand {
  constructor(
    public readonly userId: number,
    public readonly guid: string
  ) { }
}
