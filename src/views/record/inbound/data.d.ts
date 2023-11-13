import { DataList, Search, Total } from '../types/data.d'

export interface InboundData extends Omit<DataList, 'client'> {}

export interface Inbound {
	items: InboundData[]
	allItems: InboundData[]
	total: number
}

export interface SearchData extends Search {}

export interface TotalData extends Total {}
