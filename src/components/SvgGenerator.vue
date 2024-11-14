<template>
  <div
    class="absolute left-0 top-0 h-full w-full"
    :style="{ backgroundImage: `url(${svgImageUrl})` }"
  />
</template>
<script setup lang="ts">
// const generateType: 'svg' | 'img' = 'svg';
import type { GenerateLocationType, SvgOptionsType } from './type';
const props = defineProps<{
  itemSize: {
    width: number;
    height: number;
  };
  spaceDistance: {
    gapX: number;
    gapY: number;
  };
  generateLocation: GenerateLocationType[];
}>();
const svgOptions = ref<SvgOptionsType>({
  strokeColor: '#D5D9DF',
  strokeWidth: 10,
  turnedWidth: 25,
  arrowWidth: 8,
});
const svgImageUrl = ref<string>();
const generateSvgItem = (item: GenerateLocationType) => {
  const { width, height } = props.itemSize;
  const { gapX, gapY } = props.spaceDistance;
  const { beginBlock, endBlock, endPointType } = item;
  const [beginRow, beginColumn] = beginBlock;
  const [endRow, endColumn] = endBlock;
  const begin = [
    beginColumn * (width + gapX) + width / 2,
    beginRow * (height + gapY) + height / 2,
  ] as const;
  const cutX =
    endPointType === 'arrow' && beginColumn !== endColumn
      ? -svgOptions.value.arrowWidth
      : width / 2;
  const cutY =
    endPointType === 'arrow' && beginColumn === endColumn
      ? -svgOptions.value.arrowWidth
      : height / 2;
  const end = [endColumn * (width + gapX) + cutX, endRow * (height + gapY) + cutY] as const;
  if (beginColumn === endColumn || beginRow === endRow) return renderLine(begin, end, endPointType);
  return renderTurnedLine(begin, end, endPointType);
};
const renderLine = (
  begin: readonly [number, number],
  end: readonly [number, number],
  endPointType: GenerateLocationType['endPointType'],
) => {
  const baseDPath = `<line x1="${begin[0]}" y1="${begin[1]}" x2="${end[0]}" y2="${end[1]}" stroke="${svgOptions.value.strokeColor}" stroke-width="${svgOptions.value.strokeWidth}"`;
  const dPath =
    endPointType === 'arrow' ? `${baseDPath} marker-end="url(#markerArrow)" />` : baseDPath + ' />';
  return dPath;
};
const renderTurnedLine = (
  begin: readonly [number, number],
  end: readonly [number, number],
  endPointType: GenerateLocationType['endPointType'],
) => {
  const Q11 = [begin[0], end[1]].join(',');
  const Q12 = [begin[0] + svgOptions.value.turnedWidth, end[1]].join(',');
  const d = `M ${begin.join(',')} V ${end[1] - svgOptions.value.turnedWidth}  Q ${Q11} ${Q12} H ${end[0]} `;
  const baseDPath = `<path d="${d}" stroke="${svgOptions.value.strokeColor}" fill="none" stroke-width="${svgOptions.value.strokeWidth}"`;
  const dPath =
    endPointType === 'arrow' ? `${baseDPath} marker-end='url(#markerArrow)' />` : baseDPath + ' />';
  return dPath;
};
const reGenerateSvg = () => {
  const ta = '<svg xmlns="http://www.w3.org/2000/svg">';
  const tb = '</svg>';
  const arrowMarker = `<defs>
    <marker id="markerArrow"
      markerWidth="1.5"
      markerHeight="3"
      refX="0.5"
      refY="1.5"
      orient="auto"
      markerUnits="strokeWidth">
      <path d='M0,0 L0,3 L1.5,1.5 L0,0' style='fill:${svgOptions.value.strokeColor}' />
    </marker>
  </defs>`;
  const content = props.generateLocation
    .map((item) => generateSvgItem(item))
    .filter((t) => t.length);
  svgImageUrl.value = svgToUrl([ta, arrowMarker, ...content, tb].join(''));
};
const svgToUrl = (svg: string) => {
  const encoded = svg
    .replace(/<!--(.*)-->/g, '')
    .replace(/[\r\n]/g, ' ')
    .replace(/"/g, `'`)
    .replace(/%/g, '%25')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
  return '"' + `data:image/svg+xml,${encoded}` + '"';
};
watch(
  props.generateLocation,
  () => {
    reGenerateSvg();
  },
  { deep: true, immediate: true },
);
</script>
