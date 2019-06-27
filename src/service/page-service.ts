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

  createOrUpdate(page: Page): void {
    this.$store.dispatch(`${consts.pageStoreKey}/createOrUpdate`, page)
  }

  loadPage(pageId: string): void {
    this.$store.dispatch(`${consts.pageStoreKey}/loadPage`, pageId)
  }
}