<template>
  <v-card-text class="editor-area" >
    <div ref="editor" class="pell"></div>
  </v-card-text>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabService from '../../service/tab-service'
import Tab from '@/model/tab'
import { exec, init } from 'pell'

@Component
export default class EditorHeader extends Vue {
  private tabService: TabService = new TabService(this.$store)
  get activeTab(): Tab {
    return this.tabService.activeTab()
  }
  mounted() {
    const editor = init({
      element: this.$refs.editor,
      onChange: (html: any) => {
        console.log(html)
      },
      defaultParagraphSeparator: 'p',
      styleWithCSS: true,
      actions: [
        'bold',
        'underline',
        {
          name: 'italic',
          result: () => exec('italic')
        },
        {
          name: 'backColor',
          icon: '<div style="background-color:pink;">A</div>',
          title: 'Highlight Color',
          result: () => exec('backColor', 'pink')
        },
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) exec('insertImage', url)
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) exec('createLink', url)
          }
        }
      ],
      classes: {
        actionbar: 'pell-actionbar-custom-name',
        button: 'pell-button-custom-name',
        content: 'pell-content-custom-name',
        selected: 'pell-button-selected-custom-name'
      }
    })
  }
}
</script>
