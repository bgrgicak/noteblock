export default class Page {
  constructor(
    public readonly id: string,
    public readonly tabId: string,
    public readonly order: number,
    public readonly content: string
  ) {}
}