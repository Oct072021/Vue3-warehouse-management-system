import { Http } from '@/network/request'
import { Outbound, SearchData, OutboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
  return Http.get<SearchData, Outbound>('/outbound/list', { params })
}

export function fetchDetail(id: number) {
  return Http.get<{ id: number }, OutboundDetail>('/outbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
  return Http.get<{ area: string }, Export[]>('/outbound/all', { params: { area } })
}

export function createOrder(data: Order) {
  return Http.post<Order, boolean>('/outbound/create', data)
}

export function updateOrder(data: Order) {
  return Http.post<Order, boolean>('/outbound/update', data)
}

export function remove(id: number) {
  return Http.delete<{ id: number }, boolean>('/outbound/remove', { params: { id } })
}

export function audit(data: Audit) {
  return Http.put<Audit, boolean>('/outbound/audit', data)
}
