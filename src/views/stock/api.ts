import { Http } from '@/network/request'
import { SearchList, Stock } from './data.d'

export function fetchList(params?: SearchList) {
  return Http.get<SearchList, Stock>('/stock/list', { params })
}
