<template>
  <div
    class="overflow-hidden border text-center text-green-100"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
      lineHeight: `${props.height}px`,
    }"
  >
    {{ props.content }}
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
    content?: string;
  }>(),
  {
    content: () => Math.random().toString(36).substring(2),
  },
);
</script>
<style scoped lang="scss"></style>
