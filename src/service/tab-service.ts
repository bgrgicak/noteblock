import Tab from '@/model/tab';
import DB from '@/utility/db';
import Page from '@/model/page';
import consts from '@/utility/consts';

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

  add(tabName: string | undefined): void {
    const tabId = DB.id()

    const page = new Page(
      DB.id(),
      tabId,
      0,
      ''
    )
    this.$store.dispatch(`${consts.pageStoreKey}/add`, page)

    const tab = new Tab(
      tabId,
      tabName ? tabName : 'Tab',
      [page.id],
      page.id
    )
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