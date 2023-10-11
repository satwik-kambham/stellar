<script setup>
import { ref } from 'vue'
import Panel from './Panel.vue'
import TextEditor from './TextEditor.vue'

const file_content = ref("")

window.electronAPI.getFileContents((event, data) => {
  file_content.value = data
})
</script>

<template>
  <div class="w-100 min-h-screen bg-dark-background text-default-text">
    <Panel>
      <TextEditor :content="file_content"/>
    </Panel>
  </div>
</template>
