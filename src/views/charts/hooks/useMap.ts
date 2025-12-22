import { ChartType, ListVO } from '../types/data.d'

export const useMap = () => {
  const typeMap: Record<ChartType, { type: string; key: keyof Omit<ListVO, 'type'> }> = {
    turnover: { type: 'line', key: 'total' },
    order: { type: 'bar', key: 'orders' },
  }
  return {
    typeMap,
  }
}
