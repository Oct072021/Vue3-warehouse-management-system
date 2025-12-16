import { Http } from '@/network/request'
import { CommentListVO, ListVO } from './data.d'

export function fetchList() {
  return Http.post<null, ListVO[]>('/waterfall/imgList')
}
export function fetchCompList() {
  return Http.post<null, CommentListVO[]>('/waterfall/comp')
}
