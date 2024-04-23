import { fetchList } from './api'
import { SearchList } from './data.d'

export async function getStockData(searchList?: SearchList) {
	const res = await fetchList(searchList)
	return res
}
