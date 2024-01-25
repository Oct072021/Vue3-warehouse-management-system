import { InboundData } from './data.d'
import { AuditData, BaseData, Detail, Search, Total } from '../types/data'

export type InboundData = BaseData

export type InboundDetail = Omit<BaseData & Detail, 'title' | 'auditor'>

export interface CreateAndUpdate extends Omit<InboundData, 'id'> {}

export interface Inbound {
	items: InboundData[]
	allItems: InboundData[]
	total: number
}

export interface SearchData extends Search {}

export interface TotalData extends Total {}

export interface Audit {
	status: number
	detail: InboundDetail
}
