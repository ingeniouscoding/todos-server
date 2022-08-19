export class TodoReadModel {
  constructor(
    public readonly guid: string,
    public readonly content: string,
    public readonly isComplete: boolean
  ) { }
}
