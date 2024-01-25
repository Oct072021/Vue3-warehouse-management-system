import { Http } from '@/utils/request'
import { Outbound, OutboundData, SearchData, TotalData } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Outbound>('/vue-element-admin/outbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<OutboundData>('/vue-element-admin/outbound/detail', { params: { id } })
}

export function createOrder(data: OutboundData) {
	return Http.postRequest('/vue-element-admin/outbound/create', data)
}

export function updateOrder(data: OutboundData) {
	return Http.postRequest('/vue-element-admin/outbound/update', data)
}

export function remove(id: number) {
	return Http.postRequest('/vue-element-admin/outbound/remove', { id })
}
