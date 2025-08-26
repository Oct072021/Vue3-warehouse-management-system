import { Http } from '@/utils/request'
import { Inbound, SearchData, InboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Inbound>('/inbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<InboundDetail>('/inbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
	return Http.getRequest<Export[]>('/inbound/all', { params: { area } })
}

export function createOrder(data: Order) {
	return Http.postRequest('/inbound/create', data)
}

export function updateOrder(data: Order) {
	return Http.postRequest('/inbound/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/inbound/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/inbound/audit', data)
}
