import { Http } from '@/network/request'
import { ListVO } from './data.d'

export function fetchList() {
  return Http.postRequest<ListVO[]>('/test/textList')
}
