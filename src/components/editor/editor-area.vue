<template>
  <v-card-text class="py-0 editor-area" :class="{'hide-page-delete': activeTab.pageIds.length < 2}">
    <div ref="editor" class="pell" @keydown="onKeyup" @click="onClick"></div>
  </v-card-text>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import pell from 'pell'
import { isLink } from '@/utility/format';
import Page from '@/model/page'
import PageService from '@/service/page-service'
import TabService from '@/service/tab-service';
import Tab from '@/model/tab'

@Component
export default class EditorHeader extends Vue {
  @Prop() tabs: Tab[]
  @Prop() activeTab: Tab

  private pageService: PageService = new PageService(this.$store)
  private tabService: TabService = new TabService(this.$store)

  private editor: any

  get activePageId(): string {
    return this.activeTab.activePageId
  }
  get activePage(): Page | undefined {
    return this.pageService.get(this.activePageId)
  }
  private ensureHTTP(str: string): string {
    return /^https?:\/\//.test(str) && str || `http://${str}`
  }
  private deletePage(): void {
    console.log('DELETE PAGE')
  }
  private onKeyup(event: any): void {
    if (event.key === 'Tab') {
      event.preventDefault()
      pell.exec(event.shiftKey ? 'outdent' : 'indent')
    }
  }
  private onClick(event: any): void {
    if (event.target.tagName === 'A' &&
      (event.ctrlKey === true || event.metaKey === true)
      && isLink(event.target.href)
    ) {
      chrome.tabs.create({
        url: event.target.href
      })
    }
  }
  private updatePage(content: string): void {
    this.pageService.createOrUpdate(
      Object.assign(this.activePage, { content })
    )
  }

  @Watch('activePageId', {immediate: true}) activePageIdChange() {
    this.pageService.loadPage(this.activePageId)
  }
  @Watch('activePage', {immediate: true}) activePageChange() {
    if(this.activePage) {
      this.editor.content.innerHTML = this.activePage.content
    }
  }

  mounted() {
    this.editor = pell.init({
      element: this.$refs.editor,
      onChange: this.updatePage,
      defaultParagraphSeparator: 'p',
      styleWithCSS: true,
      actions: [
        {
          name: 'bold',
          icon: '<i class="material-icons">format_bold</i>',
        },
        {
          name: 'italic',
          icon: '<i class="material-icons">format_italic</i>',
        },
        {
          name: 'underline',
          icon: '<i class="material-icons">format_underline</i>',
        },
        {
          name: 'strikethrough',
          icon: '<i class="material-icons">format_strikethrough</i>',
        },
        'heading1',
        'heading2',
        {
          name: 'olist',
          icon: '<i class="material-icons">format_list_numbered</i>',
        },
        {
          name: 'ulist',
          icon: '<i class="material-icons">format_list_bulleted</i>',
        },
        {
          name: 'link',
          icon: '<i class="material-icons">link</i>',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) {
              pell.exec('createLink', this.ensureHTTP(url))
            }
          }
        },
        'line',
        {
          name: 'image',
          icon: '<i class="material-icons">add_photo_alternate</i>',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) {
              pell.exec('insertImage', this.ensureHTTP(url))
            }
          }
        },
        'code',
        {
          name: 'deletePage',
          class: 'page-delete',
          icon: '<i class="material-icons">delete</i>',
          title: 'Delete page',
          result: this.deletePage
        },
      ]
    })
  }
}
</script>
<style lang="scss">
.hide-page-delete {
  .pell-actionbar .pell-button:last-child {
    display: none;
  }
}
</style>
