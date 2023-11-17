import { Http } from '@/utils/request'
import { Data } from '../types/data.d'

export function inboundTotal(type?: string) {
	return Http.getRequest<Data>('/vue-element-admin/inbound/total', { params: { type } })
}
