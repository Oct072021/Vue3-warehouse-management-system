import { Http } from '@/utils/request'
import { Inbound, InboundData, SearchData } from './data'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Inbound>('/vue-element-admin/inbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<InboundData>('/vue-element-admin/inbound/detail', { params: { id } })
}

export function createOrder(data: InboundData) {
	return Http.postRequest('/vue-element-admin/inbound/create', data)
}

export function updateOrder(data: InboundData) {
	return Http.postRequest('/vue-element-admin/inbound/update', data)
}

export function remove(id: number) {
	return Http.postRequest('/vue-element-admin/inbound/remove', { id })
}
