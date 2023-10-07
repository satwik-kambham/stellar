<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <input v-model="greeting" />
  <p class="text-3xl font-bold underline">{{ greeting }}</p>
</template>
