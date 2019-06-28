<template>
  <v-menu bottom left>
    <v-btn slot="activator" dark icon>
      <v-icon>more_vert</v-icon>
    </v-btn>

    <v-list color="white">
      <v-list-tile @click="openTab">
        <v-list-tile-content>
          <v-list-tile-title>
            Open in new tab
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>open_in_new</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile @click="saveAsPdf">
        <v-list-tile-content>
          <v-list-tile-title>
            Save as pdf
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>save_alt</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="saveAsDocx">
        <v-list-tile-content>
          <v-list-tile-title>
            Save as docx
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>save_alt</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="sendEmail">
        <v-list-tile-content>
          <v-list-tile-title>
            Send as email
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mail_outline</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Settings
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tab from '../../model/tab'
import PageService from '../../service/page-service'
import Page from '../../model/page'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import htmlDocx from 'html-docx-js'
@Component
export default class EditorMenu extends Vue {
  @Prop() activeTab: Tab

  private pageService: PageService = new PageService(this.$store)

  get activePage(): Page | undefined {
    return this.pageService.get(this.activeTab.activePageId)
  }

  private openTab(): void {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html')
    })
  }
  private saveAsPdf(): void {
    if(this.activePage) {
      html2canvas(document.querySelector('.pell-content'), {
        scale: 2
      }).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 191, 278);
        pdf.save(this.activeTab.name);
      });
    } else {
      console.error('NO PAGE')
    }
  }
  private saveAsDocx(): void {
    if(this.activePage) {
      var filename = this.activeTab.name
      const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const postHtml = "</body></html>"
      const html = preHtml+this.activePage.content+postHtml

      var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
      })
      var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)
      filename = filename?filename+'.doc':'document.doc'
      var downloadLink = document.createElement("a")
      document.body.appendChild(downloadLink)
      
      if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob, filename)
      } else{
        downloadLink.href = url
        downloadLink.download = filename
        downloadLink.click()
      }
      document.body.removeChild(downloadLink)
    } else {
      console.error('NO PAGE')
    }
  }

  private sendEmail(): void {
    if(this.activePage) {
      const body = document.querySelector('.pell-content').innerText.replace(/(?:\r\n|\r|\n)/g, '%0D%0A')
      window.open(`mailto:?subject=${this.activeTab.name}&body=${body}`, '_blank')
    } else {
      console.error('NO PAGE')
    }
  }
}
</script>
