import Page from './page';
import DB from '@/utility/db';

export default class Tab {
  constructor(
    public id: string,
    public name: string,
    public pages: Page[] = []
  ) {
    if (this.pages === undefined || this.pages.length === 0) {
      this.pages = [new Page(DB.id() , 0, '')]
    }
  }
}