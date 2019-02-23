<template>
  <v-layout row class="editor">
    <v-flex xs12>
      <v-card>
        <editor-header></editor-header>
        <editor-area></editor-area>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditorHeader from '@/components/editor/editor-header.vue'
import EditorArea from '@/components/editor/editor-area.vue'

@Component({
  components: {
    'editor-header': EditorHeader,
    'editor-area': EditorArea
  }
})
export default class Editor extends Vue {
}
</script>
