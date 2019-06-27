<template>
  <div class="editor-paging">
    <v-pagination
      v-if="hasPaging"
      v-model="activePageId"
      :length="4"
      circle>
    </v-pagination>

    <v-spacer></v-spacer>
    
    <v-tooltip top>
      <template #activator="data">
        <v-btn color="primary" v-on="data.on" class="add-page" fab small dark @click="addPage">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <span>Add page</span>
    </v-tooltip>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabService from '../../service/tab-service'
import Tab from '@/model/tab'

@Component
export default class EditorPaging extends Vue {
  @Prop() tabs: Tab[]
  @Prop() activeTab: Tab

  get activePageId(): number {
    return this.activeTab.activePageId
  }
  get hasPaging(): number {
    return this.activeTab.pageIds.length > 1
  }

  private addPage(): void {
    console.log('PAGE')
  }
}
</script>