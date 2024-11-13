<template>
  <section class="relative flex h-full w-full flex-col">
    <div class="mb-2 flex justify-end gap-2">
      <button class="m-2 rounded-xl bg-blue-400 px-4 py-2 text-white hover:bg-blue-600">
        生成SVG
      </button>
      <!-- <button class="m-2 rounded-xl bg-blue-500 px-4 py-2 text-white">动态生成</button>
      <button class="m-2 rounded-xl bg-blue-600 px-4 py-2 text-white">锚点生成</button> -->
    </div>
    <div class="flex flex-1 overflow-auto">
      <div
        class="relative flex h-max flex-wrap bg-green-50"
        :style="{ gap: `${gapY}px ${gapX}px` }"
      >
        <Tiny v-for="i in count" :key="i" :width="tinyWidth" :height="tinyHeight" />
        <SvgGenerator
          :item-size="{ width: tinyWidth, height: tinyHeight }"
          :space-distance="{ gapX, gapY }"
          :generate-location="generateLocation"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { GenerateLocationType } from './type';

const count = ref(250);
const tinyWidth = ref(120);
const tinyHeight = ref(60);
const gapX = ref(144);
const gapY = ref(144);
const generateLocation = ref<GenerateLocationType[]>([
  {
    beginBlock: [0, 0],
    endBlock: [0, 6],
  },
  {
    beginBlock: [0, 0],
    endBlock: [6, 0],
  },
  {
    beginBlock: [0, 1],
    endBlock: [1, 2],
    endPointType: 'arrow',
  },
  {
    beginBlock: [1, 2],
    endBlock: [2, 3],
    endPointType: 'arrow',
  },
  {
    beginBlock: [1, 2],
    endBlock: [3, 3],
    endPointType: 'arrow',
  },
  {
    beginBlock: [3, 3],
    endBlock: [5, 8],
    endPointType: 'arrow',
  },
]);
</script>
