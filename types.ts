
export enum StampType {
  SLIDE = 'すべり台',
  SWING = 'ブランコ',
  BARS = '鉄棒',
  SANDBOX = '砂場',
  JUNGLE_GYM = 'ジャングルジム',
  BENCH = 'ベンチ',
  TOILET = 'トイレ',
  WATER_FOUNTAIN = '水飲み場',
  WATER_TAP = '水道',
  ACORN = 'どんぐり',
  CAUTION = '注意',
  MEMO = 'メモ',
}

export interface Stamp {
  id: string;
  type: StampType;
  position: [number, number]; // [lat, lng]
  text?: string;
}

export type StampTool = StampType | 'PRINT' | 'GEOLOCATE';