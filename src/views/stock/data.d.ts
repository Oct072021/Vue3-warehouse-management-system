import { Pagination } from '@/types/pagination.d'

export interface StockData {	
	id: number | undefined
	productionID: string
	specs: string | undefined
	title: string
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
	title?: string
	sort?: string
	area?: string
}