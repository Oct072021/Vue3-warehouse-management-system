import { Http } from '@/network/request'
import { SearchList, Stock } from './data.d'

export function fetchList(params?: SearchList) {
  return Http.getRequest<Stock>('/stock/list', { params })
}
