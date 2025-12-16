import { Http } from '@/network/request'
import { Transfer, SearchData, Audit, Detail, Export, ProductionInfo, Order } from './data.d'

export function fetchList(params?: SearchData) {
	return Http.get<SearchData, Transfer>('/transfer/list', { params })
}

export function fetchDetail(id: number) {
	return Http.get<{ id: number }, Detail>('/transfer/detail', { params: { id } })
}

export function fetchAllData() {
	return Http.get<null, Export[]>('/transfer/all')
}

export function createOrder(data: Order) {
	return Http.post<Order, boolean>('/transfer/create', data)
}

export function updateOrder(data: Order) {
	return Http.post<Order, boolean>('/transfer/update', data)
}

export function remove(id: number) {
	return Http.delete<{ id: number }, boolean>('/transfer/remove', { params: { id } })
}

export function audit(data: Audit) {
	return Http.put<Audit, boolean>('/transfer/audit', data)
}

export function fetchStockID(area: string) {
	return Http.get<{ area: string }, ProductionInfo>('/stock/getProductionByArea', { params: { area } })
}
