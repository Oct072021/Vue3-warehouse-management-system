import { ListData } from '@/types/common'
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

export type Stock = ListData<StockData>

export interface SearchList implements Pagination {
	limit?: number
	page?: number
	productionName?: string
	sort?: string
	area?: string
}
