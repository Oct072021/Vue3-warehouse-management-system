import { InboundData, SearchData, CreateAndUpdate, Audit } from './data'

import { audit, createOrder, fetchDetail, fetchList, remove, updateOrder } from './api'

export async function createInboundOrder(orderInfo: CreateAndUpdate) {
	orderInfo.timestamp = +new Date(orderInfo.timestamp) + '' // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

	const res = await createOrder(orderInfo)
	return res
}

export async function updateInboundOrder(orderInfo: CreateAndUpdate) {
	const res = await updateOrder(orderInfo)
	return res
}

export async function getInboundOrders(searchList?: SearchData) {
	const res = await fetchList(searchList)
	return res
}

export async function removeInboundOrder(id: number) {
	const res = await remove(id)
	return res
}

export async function getDetail(id: number) {
	const res = await fetchDetail(id)
	if (res.data.status === 0) {
		res.data.reason = ''
	}
	return res
}

export async function auditOrder(obj: Audit) {
	if (obj.detail.reason === '') {
		obj.detail.reason = '无'
	}
	const res = await audit(obj)
	return res
}
