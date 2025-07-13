import { outboundTotal } from './api'

export async function getOutboundTotal(area?: string) {
  const res = await outboundTotal(area)
  return res
}
