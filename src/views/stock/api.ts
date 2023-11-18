import { Http } from '@/utils/request'
import { SearchList, StockData } from './data.d'

export function fetchList(params?: SearchList) {
	return Http.getRequest<StockData>('/vue-element-admin/stock/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<StockData>('/vue-element-admin/stock/detail', { params: { id } })
}

export function updateInfo(data: StockData) {
	return Http.postRequest('/vue-element-admin/stock/update', data)
}

export function remove(id: number) {
	return Http.postRequest('/vue-element-admin/stock/remove', { id })
}
