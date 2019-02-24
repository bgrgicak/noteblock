<template>
  <v-card-title class="blue white--text py-0 editor-header" >
    <v-tabs
      :value="active"
      color="blue"
      dark
      show-arrows
      slider-color="white">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        ripple
        @click="activeChange(index)">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-tooltip bottom>
      <template #activator="data">
        <v-btn color="primary" v-on="data.on" fab small dark @click="addTab">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <span>Add tab</span>
    </v-tooltip>
  
    <v-spacer></v-spacer>

    <v-menu bottom left>
      <v-btn slot="activator" dark icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-list>
        <v-list-tile>
          <v-list-tile-title @click="openApp('tab')">Open in new tab</v-list-tile-title>
          <v-list-tile-title @click="openApp('popup')">Open as new window</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-card-title>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabService from '../../service/tab-service'
import Tab from '@/model/tab'

@Component
export default class EditorHeader extends Vue {
  private tabService: TabService = new TabService(this.$store)

  get active(): number {
    return this.tabService.active()
  }

  get tabs(): Tab[] {
    return this.tabService.getAll()
  }
  private activeChange(index: number): void {
    if(index != this.active) {
      this.tabService.setActive(index)
    }
  }
  private addTab(): void {
    const activeIndex = this.tabs.length
    this.tabService.add()
    this.tabService.setActive(activeIndex)
  } 
  private openApp(type: string = 'tab'): void {
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: type
    })
  }
}
</script>
