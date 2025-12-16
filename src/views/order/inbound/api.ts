import { Http } from '@/network/request'
import { Inbound, SearchData, InboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
  return Http.get<SearchData, Inbound>('/inbound/list', { params })
}

export function fetchDetail(id: number) {
  return Http.get<{ id: number }, InboundDetail>('/inbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
  return Http.get<{ area: string }, Export[]>('/inbound/all', { params: { area } })
}

export function createOrder(data: Order) {
  return Http.post<Order, boolean>('/inbound/create', data)
}

export function updateOrder(data: Order) {
  return Http.post<Order, boolean>('/inbound/update', data)
}

export function remove(id: number) {
  return Http.delete<{ id: number }, boolean>('/inbound/remove', { params: { id } })
}

export function audit(data: Audit) {
  return Http.put<Audit, boolean>('/inbound/audit', data)
}
