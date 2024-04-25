import { InboundData } from './data.d'
import { AuditData, BaseData, Detail, Search } from '../types/data'
import { ListData } from '@/types/common'

export interface InboundData extends BaseData {
	supplier: string
}

export type InboundDetail = Omit<InboundData & Detail, 'title'>

export type Inbound = ListData<InboundData>

export type SearchData = Search

export interface Audit {
	status: number
	detail: InboundDetail
}

export type Order = Omit<InboundData & Detail, 'status' | 'auditor' | 'reason' | 'id'>

export type Export = InboundData & Detail
