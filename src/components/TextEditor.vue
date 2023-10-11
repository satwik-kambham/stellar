<script setup>
import { ref, computed, watch } from 'vue'
import Line from "./Line.vue"
import TextBuffer from "../text_editor/text_buffer.ts"
import InputHandler from "../text_editor/input_handler.ts"

const props = defineProps(['content'])

const text_buffer = ref(new TextBuffer(props.content))
const input_handler = new InputHandler(text_buffer)

const lines = computed(() => text_buffer.value.content)
const cursor_line = computed(() => text_buffer.value.cursor.line)
const cursor_column = computed(() => text_buffer.value.cursor.column)

// Watch for changes in props.content and update text_buffer accordingly
watch(() => props.content, (newContent) => {
  text_buffer.value.updateContent(newContent)
})

function handle_keydown(event) {
  event.preventDefault()
  input_handler.handle_keydown(event.key)
}
</script>

<template>
  <div tabindex="0" @keydown="handle_keydown" class="bg-light-background whitespace-pre-wrap">
    <Line v-for="(line, index) in lines" :content="line" :current_line="index + 1 == cursor_line"/>
  </div>
  <div class="bg-dark-background">
    {{ cursor_line }}:{{ cursor_column }}
  </div>
</template>
