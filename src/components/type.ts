// OuterBox
/**
 * beginBlock/endBlock : [row,column]
 */
export type GenerateLocationType = {
  beginBlock: [number, number];
  endBlock: [number, number];
  endPointType?: 'arrow' | 'circle';
};

// SvgGenerator
export interface SvgOptionsType {
  strokeColor: string;
  strokeWidth: number;
  turnedWidth: number;
  arrowWidth: number;
}
