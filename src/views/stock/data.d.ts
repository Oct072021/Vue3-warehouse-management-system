import { Pagination } from '@/types/pagination.d'

export interface StockData {
	[index: string]: any
	id: number | undefined
	itemID: string
	specs: string | undefined
	title: string
	area: string
	quantity: number | undefined
	mass: number | undefined
}

export interface SearchList implements Pagination {
	limit?: number
	page?: number
	title?: string
	sort?: string
	area?: string
}
export interface Options {
	[index: string]: string
}
