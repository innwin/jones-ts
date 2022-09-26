export class Paging<ITEM> {
  items: ITEM[];
  nextPage?: any;
  emptyTips?: string;

  constructor(items: ITEM[], nextPage?: any, emptyTips?: string) {
    this.items = items;
    this.nextPage = nextPage;
    this.emptyTips = emptyTips;
  }
}
