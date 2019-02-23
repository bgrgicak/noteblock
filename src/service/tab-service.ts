import Tab from '@/model/tab';
import DB from '@/utility/db';

export default class TabService {

  private readonly storeKey: string = 'tabs'

  constructor(
    private $store: any = undefined
  ) {}

  get(tabId: string): Tab {
    return this.$store.getters[`${this.storeKey}/get`](tabId)
  }

  getAll(): Tab[] {
    return this.$store.getters[`${this.storeKey}/getAll`]
  }

  active(): number {
    return this.$store.getters[`${this.storeKey}/active`]
  }

  activeTab(): Tab {
    return this.$store.getters[`${this.storeKey}/activeTab`]
  }

  add(): void {
    const tab = new Tab(DB.id(), 'Tab')
    this.$store.dispatch(`${this.storeKey}/add`, tab)
  }

  update(tab: Tab): void {
    this.$store.dispatch(`${this.storeKey}/update`, tab)
  }

  updateAll(tabs: Tab[]): void {
    this.$store.dispatch(`${this.storeKey}/updateAll`, tabs)
  }

  setActive(active: number): void {
    this.$store.dispatch(`${this.storeKey}/setActive`, active)
  }

}