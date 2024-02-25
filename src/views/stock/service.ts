import { fetchList, remove, updateInfo } from './api'
import { SearchList, StockData } from './data.d'

export async function getStockData(searchList?: SearchList) {
	const res =await fetchList(searchList)
	return res
}

export function updateStockInfo(info: StockData) {
	const res = updateInfo(info)
	return res
}

export function removeStock(id: number) {
	const res = remove(id)
	return res
}
