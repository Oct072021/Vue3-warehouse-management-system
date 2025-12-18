import { Http } from '@/network/request'
import { SearchDTO, AuditDTO, ProductionInfo, ListVO, CreateDTO, UpdateDTO } from './data.d'
import { List } from '@/types/common'

export function page(params?: SearchDTO) {
  return Http.get<SearchDTO, List<ListVO>>('/transfer/list', { params })
}

export function detailById(id: ListVO['id']) {
  return Http.get<Pick<ListVO, 'id'>, ListVO>('/transfer/detail', { params: { id } })
}

export function all() {
  return Http.get<null, ListVO[]>('/transfer/all')
}

export function create(data: CreateDTO) {
  return Http.post<CreateDTO, boolean>('/transfer/create', data)
}

export function update(data: UpdateDTO) {
  return Http.post<UpdateDTO, boolean>('/transfer/update', data)
}

export function remove(id: ListVO['id']) {
  return Http.delete<Pick<ListVO, 'id'>, boolean>('/transfer/remove', { params: { id } })
}

export function audit(data: AuditDTO) {
  return Http.put<AuditDTO, boolean>('/transfer/audit', data)
}

export function fetchStockID(area: string) {
  return Http.get<{ area: string }, ProductionInfo>('/stock/getProductionByArea', { params: { area } })
}
