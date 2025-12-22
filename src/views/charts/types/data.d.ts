export interface ChartVO {
  [index: string]: Omit<ListVO, 'type'>
}

export interface ListVO {
  total: number[]
  orders: number[]
  type: { [index: string]: number }
}

export type ChartType = 'turnover' | 'order'