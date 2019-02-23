<template>
  <v-card-title class="blue white--text py-0 editor-header" >
    <v-tabs
      :value="activeTab"
      color="blue"
      dark
      slider-color="white">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        ripple
        @click="activeTabChange(index)">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-btn color="primary" fab small dark @click="addTab">
      <v-icon>add</v-icon>
    </v-btn>
  
    <v-spacer></v-spacer>

    <v-menu bottom left>
      <v-btn slot="activator" dark icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-list>
        <v-list-tile>
          <v-list-tile-title>Settings</v-list-tile-title>
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

  get activeTab(): number {
    return this.tabService.active()
  }

  get tabs(): Tab[] {
    return this.tabService.getAll()
  }
  private activeTabChange(index: number): void {
    if(index != this.activeTab) {
      this.tabService.setActive(index)
    }
  }
  private addTab(): void {
    const activeIndex = this.tabs.length
    this.tabService.add()
    this.tabService.setActive(activeIndex)
  }
}
</script>
