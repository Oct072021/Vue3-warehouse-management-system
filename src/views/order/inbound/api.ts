import { Http } from '@/utils/request'
import { Inbound, InboundData, SearchData, CreateAndUpdate, InboundDetail, Audit } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Inbound>('/vue-element-admin/inbound/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<InboundDetail>('/vue-element-admin/inbound/detail', { params: { id } })
}

export function createOrder(data: CreateAndUpdate) {
	return Http.postRequest('/vue-element-admin/inbound/create', data)
}

export function updateOrder(data: CreateAndUpdate) {
	return Http.postRequest('/vue-element-admin/inbound/update', data)
}

export function remove(id: number) {
	return Http.postRequest('/vue-element-admin/inbound/remove', { id })
}

export function audit(data: Audit) {
	return Http.putRequest('/vue-element-admin/inbound/audit', data)
}
