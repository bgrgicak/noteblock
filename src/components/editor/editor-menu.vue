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

@Component
export default class EditorMenu extends Vue {
  private openTab(): void {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html')
    })
  }
}
</script>
