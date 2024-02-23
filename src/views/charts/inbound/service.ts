import { inboundTotal } from './api'

export async function getInboundTotal(area?: string) {
	const res = await inboundTotal(area)
	return res
}
