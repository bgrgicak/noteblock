<template>
  <v-card-title class="blue white--text py-0 editor-header" >
    <v-tabs
      color="blue"
      :value="activeTabIndex"
      dark
      show-arrows
      slider-color="white">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        ripple
        @dblclick="setRenameTab(tab)"
        @click="activeChange(tab.id)">
        {{ tab.name }}
        <v-btn flat icon small color="white" class="m-0 ml-4" @click="setDeleteTab(tab)">
          <v-icon>clear</v-icon>
        </v-btn>
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

    <editor-menu :activeTab="activeTab"></editor-menu>


    <v-dialog :value="renameTab !== null">
      <v-card v-if="renameTab !== null">
        <v-card-text>
          <v-text-field 
            label="Tab name" 
            :value="renameTab.name"
            :autofocus="true"
            @keyup.enter="renameClick"
            @input="tabNameUpdate">
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            flat
            @click="setRenameTab(null)">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="renameClick">
            Rename
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="deleteTab !== null">
      <v-card v-if="deleteTab !== null">
        <v-card-title
          class="headline"
          primary-title>
          Delete tab {{deleteTab.name}}?
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete tab {{deleteTab.name}}?
          You can't restore your tab after it's deleted.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            flat
            @click="setDeleteTab(null)">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="deleteClick">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-title>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabService from '../../service/tab-service'
import Tab from '@/model/tab'
import EditorMenu from '@/components/editor/editor-menu.vue'

@Component({
  components: {
    'editor-menu': EditorMenu
  }
})
export default class EditorHeader extends Vue {
  @Prop() tabs: Tab[]
  @Prop() activeTab: Tab

  private tabService: TabService = new TabService(this.$store)

  private renameTab: Tab | null = null
  private deleteTab: Tab | null = null

  get activeTabIndex(): number {
    return this.tabs.findIndex((t: Tab) => t.id === this.activeTab.id)
  }

  private activeChange(tabId: string): void {
    if (tabId != this.activeTab.id) {
      this.tabService.setActive(tabId)
    }
  }

  private addTab(): void {
    const activeIndex = this.tabs.length
    this.tabService.add()
    this.tabService.setActive(activeIndex)
  }

  private setRenameTab(tab: Tab | null): void {
    this.renameTab = tab
  }
  private tabNameUpdate(newName: string): void {
    const tab = Object.assign({}, this.renameTab)
    tab.name = newName
    this.renameTab = tab
  }
  private renameClick(): void {
    if(this.renameTab) {
      this.tabService.update(this.renameTab)
      this.tabRefresh++
      this.setRenameTab(null)
    }
  } 

  private setDeleteTab(tab: Tab | null): void {
    this.deleteTab = tab
  }
  private deleteClick(): void {
    if(this.deleteTab !== null) {
      this.tabService.remove(this.deleteTab.id)
      this.setDeleteTab(null)
    }
  }
}
</script>
