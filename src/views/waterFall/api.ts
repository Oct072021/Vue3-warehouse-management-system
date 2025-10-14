import { Http } from '@/utils/request'
import { CommentListVO, ListVO } from './data.d'

export function fetchList() {
  return Http.postRequest<ListVO[]>('/waterfall/imgList')
}
export function fetchCompList() {
  return Http.postRequest<CommentListVO[]>('/waterfall/comp')
}
