import { Http } from '@/network/request'
import { Data } from '../types/data.d'

export function outboundTotal(area?: string) {
  return Http.getRequest<Data>('/outbound/total', { params: { area } })
}
