import { Http } from '@/network/request'

import { List } from '@/types/common'
import { SearchDTO, ListVO } from './data.d'

export const page = (params: SearchDTO) => {
  return Http.get<SearchDTO, List<ListVO>>('/stock/list', { params })
}
