<template>
  <v-card-text class="py-0 editor-area" >
    <div ref="editor" class="pell"></div>
  </v-card-text>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabService from '../../service/tab-service'
import Tab from '@/model/tab'
import pell from 'pell'

@Component
export default class EditorHeader extends Vue {
  private tabService: TabService = new TabService(this.$store)
  get activeTab(): Tab {
    return this.tabService.activeTab()
  }
  private ensureHTTP(str: string): string {
    return /^https?:\/\//.test(str) && str || `http://${str}`
  }
  private deletePage(): void {
    console.log('DELETE PAGE')
  }
  mounted() {
    const editor = pell.init({
      element: this.$refs.editor,
      onChange: (html: any) => {
        console.log(html)
      },
      defaultParagraphSeparator: 'p',
      styleWithCSS: true,
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
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
        'code',
        'line',
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) pell.exec('insertImage', this.ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) pell.exec('createLink', this.ensureHTTP(url))
          }
        },
        {
          name: 'deletePage',
          icon: '<i class="material-icons">delete</i>',
          title: 'Delete page',
          result: this.deletePage
        },
      ]
    })
  }
}
</script>
