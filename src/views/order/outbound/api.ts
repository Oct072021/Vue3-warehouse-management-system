import { Http } from '@/network/request'
import { CreateDTO, ListVO, SearchDTO, UpdateDTO, AuditDTO } from './data.d'
import { List } from '@/types/common'

export function page(params?: SearchDTO) {
  return Http.get<SearchDTO, List<ListVO>>('/outbound/list', { params })
}

export function detailById(id: ListVO['id']) {
  return Http.get<Pick<ListVO, 'id'>, ListVO>('/outbound/detail', { params: { id } })
}

export function all(area: ListVO['area']) {
  return Http.get<Pick<ListVO, 'area'>, ListVO[]>('/outbound/all', { params: { area } })
}

export function create(data: CreateDTO) {
  return Http.post<CreateDTO, boolean>('/outbound/create', data)
}

export function update(data: UpdateDTO) {
  return Http.post<UpdateDTO, boolean>('/outbound/update', data)
}

export function remove(id: ListVO['id']) {
  return Http.delete<Pick<ListVO, 'id'>, boolean>('/outbound/remove', { params: { id } })
}

export function audit(data: AuditDTO) {
  return Http.put<AuditDTO, boolean>('/outbound/audit', data)
}
