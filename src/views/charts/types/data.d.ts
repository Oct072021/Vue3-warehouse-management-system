export interface AllData {
  [index: string]: Omit<Data, 'type'>
}

export interface Data {
  total: number[]
  orders: number[]
  type: { [index: string]: number }
}
