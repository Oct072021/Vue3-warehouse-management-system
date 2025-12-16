import { Http } from '@/network/request'
import { ListVO } from './data.d'

export function fetchList() {
  return Http.post<null, ListVO[]>('/test/textList')
}
