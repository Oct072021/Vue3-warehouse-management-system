import { OutboundData, SearchData } from './data.d'

import { createOrder, fetchList, remove, updateOrder } from './api'

export function createOutboundOrder(orderInfo: OutboundData) {
	orderInfo.timestamp = +new Date(orderInfo.timestamp) + '' // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

	const res = createOrder(orderInfo)
	return res
}

export function updateOutboundOrder(orderInfo: OutboundData) {
	const res = updateOrder(orderInfo)
	return res
}

export function getOutboundOrders(searchList?: SearchData) {
	const res = fetchList(searchList)
	return res
}

export function removeOutboundOrder(id: number) {
	const res = remove(id)
	return res
}
