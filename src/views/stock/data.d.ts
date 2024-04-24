import { Pagination } from '@/types/pagination.d'

export interface StockData {	
	id: number | undefined
	productionID: string
	specs: string | undefined
	productionName: string
	area: string
	quantity: number | undefined
	unit: number | undefined
}

export interface Stock{
  items: StockData[]
	total: number
}

export interface SearchList implements Pagination {
	limit?: number
	page?: number
	productionName?: string
	sort?: string
	area?: string
}