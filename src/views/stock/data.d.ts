import { Pagination } from '@/types/pagination.d'

export interface ListVO {
  id: number
  productionID: string
  specs: string
  productionName: string
  area: string
  quantity: number
  unit: number
}

export interface SearchDTO extends Pagination {
  productionName?: string
  sort?: string
  area?: string
}
