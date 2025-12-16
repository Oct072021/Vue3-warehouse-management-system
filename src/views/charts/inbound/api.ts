import { Http } from '@/network/request'
import { Data } from '../types/data.d'

export function inboundTotal(area?: string) {
  return Http.get<{ area: string }, Data>('/inbound/total', { params: { area } })
}
