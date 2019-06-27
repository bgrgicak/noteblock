<template>
  <v-app>
    <v-content>
      <v-layout row class="editor">
        <v-flex xs12>
          <v-card v-if="tabs.length > 0 && activeTab">
            <editor-header :tabs="tabs" :activeTab="activeTab"></editor-header>
            <editor-area :tabs="tabs" :activeTab="activeTab"></editor-area>
            <editor-paging :tabs="tabs" :activeTab="activeTab"></editor-paging>
          </v-card>
          <v-card v-else>
            LOADING
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EditorHeader from '@/components/editor/editor-header.vue'
import EditorArea from '@/components/editor/editor-area.vue'
import EditorPaging from '@/components/editor/editor-paging.vue'
import TabService from '@/service/tab-service'
import Tab from '@/model/tab';

@Component({
  components: {
    'editor-header': EditorHeader,
    'editor-area': EditorArea,
    'editor-paging': EditorPaging
  }
})
export default class App extends Vue {
  private tabService: TabService = new TabService(this.$store)

  get tabs(): Tab {
    return this.tabService.getAll()
  }
  get activeTab(): number {
    return this.tabService.activeTab()
  }

  @Watch('tabs', {immediate: true}) tabsChange() {
    if(this.tabService.loaded() && this.tabs.length === 0) {
      this.tabService.add()
      this.tabService.setActive(0)
    }
  }

  mounted() {
   this.tabService.load() 
  }
}
</script>
