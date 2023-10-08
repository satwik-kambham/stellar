<script setup>
import { ref } from 'vue'
import Panel from './Panel.vue'
import TextEditor from './TextEditor.vue'

</script>

<template>
  <div class="w-100 min-h-screen bg-dark-background text-default-text">
    <Panel>
      <TextEditor/>
    </Panel>
  </div>
</template>
