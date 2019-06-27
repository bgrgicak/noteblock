export default class Tab {
  constructor(
    public id: string,
    public name: string,
    public pageIds: string[],
    public activePageId: string
  ) {}
}