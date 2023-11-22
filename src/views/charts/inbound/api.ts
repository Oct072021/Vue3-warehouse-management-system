import { Http } from '@/utils/request'
import { Data } from '../types/data.d'

export function inboundTotal(area?: string) {
	return Http.getRequest<Data>('/vue-element-admin/inbound/total', { params: { area } })
}
