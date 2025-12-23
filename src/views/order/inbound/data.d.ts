import { BaseData, Search } from '../types/data'

export interface ListVO extends BaseData {
  supplier: string
}

export type SearchDTO = Search

export interface AuditDTO {
  status: number
  detail: ListVO
}

export type UpdateDTO = Omit<ListVO, 'status' | 'auditor' | 'reason'>
export type CreateDTO = Omit<UpdateDTO, 'id'>
