import { Http } from '@/utils/request'
import { Data } from '../types/data.d'

export function outboundTotal(type?: string) {
	return Http.getRequest<Data>('/vue-element-admin/outbound/total', { params: { type } })
}
