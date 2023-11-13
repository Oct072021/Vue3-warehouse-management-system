import { Http } from '@/utils/request'
import { OutboundData, SearchData, TotalData } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<OutboundData[]>('/vue-element-admin/outbound/list', { params })
}

export function fetchDetail(params: string) {
	return Http.getRequest<OutboundData>('/vue-element-admin/outbound/detail', { params })
}

export function createOrder(data: OutboundData) {
	return Http.postRequest('/vue-element-admin/outbound/create', data)
}

export function updateArticle(data: OutboundData) {
	return Http.postRequest('/vue-element-admin/outbound/update', data)
}

export function remove(data: number) {
	return Http.postRequest('/vue-element-admin/outbound/remove', { data })
}

export function outboundTotal(type?: string) {
	return Http.getRequest<TotalData>('/vue-element-admin/outbound/total', { params: { type } })
}
