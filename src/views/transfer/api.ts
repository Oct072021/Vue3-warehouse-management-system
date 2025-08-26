import { Http } from '@/utils/request'
import { Transfer, SearchData, Audit, Detail, Export, ProductionInfo, Order } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.getRequest<Transfer>('/transfer/list', { params })
}

export function fetchDetail(id: number) {
	return Http.getRequest<Detail>('/transfer/detail', { params: { id } })
}

export function fetchAllData() {
	return Http.getRequest<Export[]>('/transfer/all')
}

export function createOrder(data: Order) {
	return Http.postRequest('/transfer/create', data)
}

export function updateOrder(data: Order) {
	return Http.postRequest('/transfer/update', data)
}

export function remove(id: number) {
	return Http.deleteRequest('/transfer/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.putRequest('/transfer/audit', data)
}

export function fetchStockID(area: string) {
	return Http.getRequest<ProductionInfo>('/stock/getProductionByArea', { params: { area } })
}
