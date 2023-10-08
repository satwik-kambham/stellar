<script setup>
import { ref, computed } from 'vue'
import Line from "./Line.vue"
import TextBuffer from "../text_editor/text_buffer.ts"
import InputHandler from "../text_editor/input_handler.ts"

const text_buffer = new TextBuffer()
const input_handler = new InputHandler(text_buffer)

const lines = computed(() => text_buffer.content)
const cursor_line = computed(() => text_buffer.cursor.line)
const cursor_column = computed(() => text_buffer.cursor.column)

function handle_keydown(event) {
  event.preventDefault()
  input_handler.handle_keydown(event.key)
}
</script>

<template>
  <div tabindex="0" @keydown="handle_keydown" class="bg-light-background whitespace-normal">
    <Line v-for="line in lines.value" :content="line"/>
  </div>
  <div class="bg-green">
    {{cursor_line}}:{{cursor_column}}
  </div>
</template>
