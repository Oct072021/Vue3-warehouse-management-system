import { ListData } from '@/types/common'

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

interface Production {
	productionID: string
	productionName: string
	quantity: number
	unit: string
}

export type Transfer = ListData<TransferData>

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
  reason:string
  auditor:string
}

export type Export = TransferData & Detail

export interface ProductionInfo {
	[index: string]: Production
}
