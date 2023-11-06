import { Http } from '@/utils/request'
import { Response } from '@/types/httpRes'
import { SearchData } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Response>('/vue-element-admin/inbound/list', { params })
}

export function fetchDetail(params: string) {
	return Http.getRequest<Response>('/vue-element-admin/inbound/detail', { params })
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
	return Http.getRequest<Response>('/vue-element-admin/inbound/total', { params: { type } })
}
