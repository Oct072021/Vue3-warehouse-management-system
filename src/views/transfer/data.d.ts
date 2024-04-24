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

export interface Transfer {
	items: TransferData[]
	total: number
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
	detail: Detail & TransferData
}

export type Export = TransferData & Detail

export interface ProductionInfo {
  [index:string]: Production
}
