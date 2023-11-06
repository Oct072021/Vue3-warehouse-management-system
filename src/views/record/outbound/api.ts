import { Http } from '@/utils/request'
import { Response } from '@/types/httpRes'
import { SearchData } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Response>('/vue-element-admin/outbound/list', { params })
}

export function fetchDetail(params: string) {
	return Http.getRequest<Response>('/vue-element-admin/outbound/detail', { params })
}

export function createArticle(data) {
	return request({
		url: '/vue-element-admin/outbound/create',
		method: 'post',
		data,
	})
}

export function updateArticle(data) {
	return request({
		url: '/vue-element-admin/outbound/update',
		method: 'post',
		data,
	})
}

export function remove(data) {
	return request({
		url: '/vue-element-admin/outbound/remove',
		method: 'post',
		data,
	})
}

export function outboundTotal(type?: string) {
	return Http.getRequest<Response>('/vue-element-admin/outbound/total', { params: { type } })
}
