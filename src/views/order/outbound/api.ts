import { Http } from '@/network/request'
import { Outbound, SearchData, OutboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Outbound>('/outbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<OutboundDetail>('/outbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
	return Http.getRequest<Export[]>('/outbound/all', { params: { area } })
}

export function createOrder(data: Order) {
	return Http.postRequest('/outbound/create', data)
}

export function updateOrder(data: Order) {
	return Http.postRequest('/outbound/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/outbound/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/outbound/audit', data)
}
