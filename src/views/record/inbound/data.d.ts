export interface InboundData {
	id: number
	itenID: string
	mass: string
	price: number
	specs: string
	quantity: number
	timestamp: string
	title: string
	total: string
	type: string
}

export interface SearchData {
	title?: string
	itemID?: string
	sort?: string
}
