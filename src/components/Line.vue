<script setup>
const props = defineProps(['content', 'current_line'])
</script>

<template>
  <div :class="{'bg-current-line' : props.current_line}">
    <div class="w-100" v-if="props.content != ''">{{ props.content }}</div>
    <div class="w-100" v-else>&nbsp;</div>
  </div>
</template>
