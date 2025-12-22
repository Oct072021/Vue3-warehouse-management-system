import { Http } from '@/network/request'
import { ListVO } from '../types/data.d'

export function inboundTotal(area?: string) {
  return Http.get<{ area: string }, ListVO>('/inbound/total', { params: { area } })
}
