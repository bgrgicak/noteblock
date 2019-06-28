import Tab from '@/model/tab';
import DB from '@/utility/db';
import Page from '@/model/page';
import consts from '@/utility/consts';
import PageService from './page-service';

export default class TabService {
  constructor(
    private $store: any = undefined
  ) {}

  loaded(): number {
    return this.$store.getters[`${consts.tabStoreKey}/loaded`]
  }

  activeTab(): Tab {
    return this.$store.getters[`${consts.tabStoreKey}/activeTab`]
  }

  setActive(tabId: string): void {
    this.$store.dispatch(`${consts.tabStoreKey}/setActive`, tabId)
  }

  get(tabId: string): Tab {
    return this.$store.getters[`${consts.tabStoreKey}/get`](tabId)
  }

  getAll(): Tab[] {
    return this.$store.getters[`${consts.tabStoreKey}/getAll`]
  }

  add(tab: Tab | undefined): void {
    if (tab === undefined) {
      const pageId = DB.id()
      tab = new Tab(
        DB.id(),
        'Tab',
        [pageId],
        pageId
      )
    }
    this.$store.dispatch(`${consts.tabStoreKey}/add`, tab)
  }

  update(tab: Tab): void {
    this.$store.dispatch(`${consts.tabStoreKey}/update`, tab)
  }

  remove(tabId: string): void {
    this.$store.dispatch(`${consts.tabStoreKey}/remove`, tabId)
  }

  load(): void {
    this.$store.dispatch(`${consts.tabStoreKey}/load`)
  }
}