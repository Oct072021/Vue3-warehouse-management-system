import { Pagination } from '@/types/pagination'

// public interface && area
export interface BaseData {
  id: number
  orderID: string
  timestamp: string
  title: string
  area: string
  type: number
  documenter: string
  status: number
  auditor: string
  contact: string
  phone: string
  remark: string
  reason: string
  production: Production[]
}

interface Production {
  productionID: string
  productionName: string
  specs1: string
  specs2: string
  quantity: number | undefined
  price: number | undefined
}

export interface Search extends Pagination {
  type?: number
  orderID?: string
  status?: number
  area: string
}
