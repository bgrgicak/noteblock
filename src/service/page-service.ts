import Page from '@/model/page'
import DB from '@/utility/db'
import consts from '@/utility/consts';

export default class PageService {
  constructor(
    private $store: any = undefined
  ) {}

  get(pageId: string): Page {
    return this.$store.getters[`${consts.pageStoreKey}/get`](pageId)
  }

  getAll(tabId: string): Page[] {
    return this.$store.getters[`${consts.pageStoreKey}/getAll`](tabId)
  }

  add(tabId: string): void {
    const pages = this.getAll(tabId)
    const page = new Page(
      DB.id(),
      tabId,
      pages && pages.length ? pages.length : 0,
      ''
    )
    this.$store.dispatch(`${consts.pageStoreKey}/add`, page)
  }

  update(page: Page): void {
    this.$store.dispatch(`${consts.pageStoreKey}/update`, page)
  }
}