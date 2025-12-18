import { Pagination } from '@/types/pagination'

// DTO
export interface SearchDTO extends Pagination {
  orderID: string
  status?: number
  timestamp: string
}
export type CreateDTO = Omit<ListVO, 'id'>
export type UpdateDTO = ListVO // 此处无特殊处理的业务逻辑，因此 DTO = VO
export interface AuditDTO {
  status: number
  id: number
  reason: string
  auditor: string
}
export interface ProductionInfo {
  [index: string]: Production
}

// VO
export interface ListVO {
  id?: number
  orderID: string
  correlationID: string
  timestamp: string
  batch: string
  origin: string
  new: string
  documenter: string
  status: number
  auditor: string
  remark: string
  reason: string
  production: Production[]
}

// common
interface Production {
  productionID: string
  productionName: string
  quantity: number
  unit: string
}
