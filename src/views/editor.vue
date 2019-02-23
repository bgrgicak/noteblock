<template>
  <v-layout row class="editor">
    <v-flex xs12>
      <v-card>
        <editor-header></editor-header>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditorHeader from '@/components/editor/editor-header.vue'

@Component({
  components: {
    'editor-header': EditorHeader
  }
})
export default class Editor extends Vue {
}
</script>
