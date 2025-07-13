import { Http } from '@/utils/request'
import { ListVO } from './data.d'

export function fetchList() {
  return Http.postRequest<ListVO[]>('/vue-element-admin/test/textList')
}
