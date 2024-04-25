import { Http } from '@/utils/request'
import { Transfer, SearchData, Audit, Detail, Export, ProductionInfo } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Transfer>('/vue-element-admin/transfer/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<Detail>('/vue-element-admin/transfer/detail', { params: { id } })
}

export function fetchAllData() {
	return Http.getRequest<Export[]>('/vue-element-admin/transfer/all')
}

export function createOrder(data: Detail) {
	return Http.postRequest('/vue-element-admin/transfer/create', data)
}

export function updateOrder(data: Detail) {
	return Http.postRequest('/vue-element-admin/transfer/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/vue-element-admin/transfer/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/vue-element-admin/transfer/audit', data)
}

export function fetchStockID(area: string) {
	return Http.getRequest<ProductionInfo>('/vue-element-admin/stock/getProductionByArea', { params: { area } })
}
