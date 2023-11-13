import { InboundData, SearchData } from './data.d'

import { createOrder, fetchList, remove, updateOrder } from './api'

export function createInboundOrder(orderInfo: InboundData) {
	orderInfo.timestamp = +new Date(orderInfo.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

	const res = createOrder(orderInfo)
	return res
}

export function updateInboundOrder(orderInfo: InboundData) {
	orderInfo.timestamp = +new Date(orderInfo.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

	const res = updateOrder(orderInfo)
	return res
}

export function getInboundOrders(searchList?: SearchData) {
	const res = fetchList(searchList)
	return res
}

export function removeInboundOrder(id: number) {
	const res = remove(id)
	return res
}
