import { Http } from '@/utils/request'
import { Outbound, SearchData, OutboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Outbound>('/vue-element-admin/outbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<OutboundDetail>('/vue-element-admin/outbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
	return Http.getRequest<Export[]>('/vue-element-admin/outbound/all', { params: { area } })
}

export function createOrder(data: Order) {
	return Http.postRequest('/vue-element-admin/outbound/create', data)
}

export function updateOrder(data: Order) {
	return Http.postRequest('/vue-element-admin/outbound/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/vue-element-admin/outbound/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/vue-element-admin/outbound/audit', data)
}
