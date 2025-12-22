import { Http } from '@/network/request'
import { ListVO } from '../types/data.d'

export function outboundTotal(area?: string) {
  return Http.get<{ area: string }, ListVO>('/outbound/total', { params: { area } })
}
