export class RemoveTodoCommand {
  constructor(
    public readonly userId: number,
    public readonly guid: string
  ) { }
}
