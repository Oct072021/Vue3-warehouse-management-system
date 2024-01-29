import { Http } from '@/utils/request'
import { Inbound, InboundData, SearchData, InboundDetail, Audit, Order, Export } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Inbound>('/vue-element-admin/inbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<InboundDetail>('/vue-element-admin/inbound/detail', { params: { id } })
}

export function fetchAllData(area: string) {
	return Http.getRequest<Export[]>('/vue-element-admin/inbound/all', { params: { area } })
}

export function createOrder(data: Order) {
	return Http.postRequest('/vue-element-admin/inbound/create', data)
}

export function updateOrder(data: Order) {
	return Http.postRequest('/vue-element-admin/inbound/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/vue-element-admin/inbound/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/vue-element-admin/inbound/audit', data)
}
