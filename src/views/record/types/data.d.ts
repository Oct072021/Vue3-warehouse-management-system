import { Pagination } from '@/types/pagination.d'

// public interface && type
export interface DataList {
	[index: string]: any
	id: number | undefined
	itemID: string
	timestamp: string
	specs: string
	title: string
	type: string
	quantity: number | undefined
	price: number | undefined
	mass: number | undefined
}

export interface Search implements Pagination {
	limit?: number
	page?: number
	title?: string
	itemID?: string
	sort?: string
	type?: string
}

export interface Total {
	total: number[]
	orders: number[]
}
