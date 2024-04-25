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
	production: Production[]
	orderID: string
	status: number
	correlationID: string
	documenter: string
	timestamp: string
	remark: string
	reason: string
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
	detail: Detail & TransferData
}

export type Export = TransferData & Detail

export interface ProductionInfo {
	[index: string]: Production
}
