import { DataList, Search, Total } from '../types/data.d'

export interface OutboundData extends DataList {
	client: string
}

export interface Outbound {
	items: OutboundData[]
	allItems: OutboundData[]
	total: number
}

export interface SearchData extends Search {}

export interface TotalData extends Total {}
