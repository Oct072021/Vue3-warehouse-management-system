import { Http } from '@/network/request'
import { Data } from '../types/data.d'

export function inboundTotal(area?: string) {
  return Http.getRequest<Data>('/inbound/total', { params: { area } })
}
