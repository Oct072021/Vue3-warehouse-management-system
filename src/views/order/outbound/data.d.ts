import { ListData } from '@/types/common'
import { BaseData, Search, Detail, Total } from '../types/data.d'

export interface OutboundData extends BaseData {
	client: string
}

export type OutboundDetail = Omit<OutboundData & Detail, 'title'>

export type Outbound = ListData<OutboundData>

export type SearchData = Search

export interface Audit {
	status: number
	detail: InboundDetail
}

export type Order = Omit<OutboundData & Detail, 'status' | 'auditor' | 'reason' | 'id'>

export type Export = OutboundData & Detail
