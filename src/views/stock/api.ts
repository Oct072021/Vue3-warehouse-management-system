import { Http } from '@/utils/request'
import { SearchList, Stock } from './data.d'

export function fetchList(params?: SearchList) {
	return Http.getRequest<Stock>('/vue-element-admin/stock/list', { params })
}
