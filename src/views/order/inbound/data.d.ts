import { InboundData } from './data.d'
import { AuditData, BaseData, Detail, Search } from '../types/data'

export type InboundData = BaseData

export type InboundDetail = Omit<BaseData & Detail, 'title'>

export interface Inbound {
	items: InboundData[]
	total: number
}

export interface SearchData extends Search {}

export interface Audit {
	status: number
	detail: InboundDetail
}

export type Order = Omit<BaseData & Detail, 'status' | 'auditor' | 'reason' | 'id'>

export type Export = Omit<BaseData & Detail>
