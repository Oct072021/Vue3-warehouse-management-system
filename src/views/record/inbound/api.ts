import { Http } from '@/utils/request'
import { InboundData, SearchData, TotalData } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<InboundData[]>('/vue-element-admin/inbound/list', { params })
}

export function fetchDetail(params: string) {
	return Http.getRequest<InboundData>('/vue-element-admin/inbound/detail', { params })
}

export function createRecord(data) {
	return request({
		url: '/vue-element-admin/inbound/create',
		method: 'post',
		data,
	})
}

export function updateRecord(data) {
	return request({
		url: '/vue-element-admin/inbound/update',
		method: 'post',
		data,
	})
}

export function remove(data) {
	return request({
		url: '/vue-element-admin/inbound/remove',
		method: 'post',
		data,
	})
}

export function inboundTotal(type?: string) {
	return Http.getRequest<TotalData>('/vue-element-admin/inbound/total', { params: { type } })
}
