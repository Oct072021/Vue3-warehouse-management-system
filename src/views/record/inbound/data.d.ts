import { DataList, Search, Total } from '../types/data'

export interface InboundData extends DataList {}

export interface Inbound {
	items: InboundData[]
	allItems: InboundData[]
	total: number
}

export interface SearchData extends Search {}

export interface TotalData extends Total {}
