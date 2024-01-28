import { InboundData } from './data.d'
import { AuditData, BaseData, Detail, Search, Total } from '../types/data'

export type InboundData = BaseData

export type InboundDetail = Omit<BaseData & Detail, 'title'>

export interface CreateAndUpdate extends Omit<InboundData, 'id' | 'auditor' | 'status'> {}

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

export type Order = Omit<BaseData & Detail, 'status' | 'auditor' | 'reason' | 'id'>
