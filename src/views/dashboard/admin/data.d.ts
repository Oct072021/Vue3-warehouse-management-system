import { ChartData } from './components/data.d'

export interface LineChartData {
  [index:string]:any
	profit: ChartData
	orders: ChartData
}
