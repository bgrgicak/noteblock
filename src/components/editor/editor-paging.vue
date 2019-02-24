<template>
  <div class="text-xs-center editor-paging">
    <v-pagination
      v-model="page"
      :length="4"
      circle
    ></v-pagination>
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
  private page: number = 1

  private addPage(): void {

  }
}
</script>