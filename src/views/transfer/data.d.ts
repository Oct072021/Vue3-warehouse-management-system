import { ListData } from '@/types/common'
import { Pagination } from '@/types/pagination.d'

// DTO
export interface TransferData {
	id: number
	orderID: string
	batch: string
	timestamp: string
	origin: string
	new: string
	status: number
	auditor: string
}

export type Transfer = ListData<TransferData>

export interface Detail {
	id: number
	production: Production[]
	orderID: string
	documenter: string
	status: number
	correlationID: string
	timestamp: string
	remark: string
	reason: string
}

export interface ProductionInfo {
	[index: string]: Production
}

// VO
export interface Order {
	production: Production[]
	orderID: string
	origin: string
	new: string
	correlationID: string
	documenter: string
	batch: string
	timestamp: string
	remark: string
}

export interface SearchData implements Pagination {
	limit?: number
	page?: number
	orderID?: string
	status?: number
	timestamp?: string
}

export interface Audit {
	status: number
	id: number
	reason: string
	auditor: string
}

export type Export = TransferData & Detail

// common
interface Production {
	productionID: string
	productionName: string
	quantity: number
	unit: string
}
