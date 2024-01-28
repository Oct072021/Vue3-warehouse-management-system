import { Pagination } from '@/types/pagination.d'

// public interface && area
export interface BaseData {
	id: number
	orderID: string
	timestamp: string
	title: string
	area: string
	type: number | undefined
	supplier: string
	documenter: string
	status: number 
	auditor: string
}

export interface Detail {
	contact: string
	number: number | undefined
	remark: string
	reason: string
	production: Production[]
}

interface Production {
	productionID: string
	productionName: string
	specs1: string
  specs2: string
	quantity: number | undefined
	price: number | undefined
}

export interface Search implements Pagination {
	limit?: number
	page?: number
	type?: number
	orderID?: string
	status?: number
	area?: string
}

export interface Total {
	total: number[]
	orders: number[]
}
