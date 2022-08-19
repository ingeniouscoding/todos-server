export class FindTodoQuery {
  constructor(
    public readonly userId: number,
    public readonly guid: string
  ) { }
}
