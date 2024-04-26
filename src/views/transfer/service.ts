import { SearchData, Audit, Order } from './data'
import { audit, createOrder, fetchAllData, fetchDetail, fetchList, fetchStockID, remove, updateOrder } from './api'

import { useUserStore } from '@/store/user'
import { parseTime } from '@/utils'

const userStroe = useUserStore()

export async function createTransferOrder(orderInfo: Order) {
	const { remark } = orderInfo
	Object.assign(orderInfo, {
		timestamp: +new Date() + '',
		remark: remark.length === 0 ? '无' : remark
	})

	const res = await createOrder(orderInfo)
	return res
}

export async function updateTransferOrder(orderInfo: Order) {
	const res = await updateOrder(orderInfo)
	return res
}

export async function getTransferOrders(searchList?: SearchData) {
	if (searchList && searchList.timestamp) {
		searchList.timestamp = parseTime(+searchList.timestamp, '{y}/{m}/{d}')!
	}
	const res = await fetchList(searchList)
	return res
}

export async function removeTransferOrder(id: number) {
	const res = await remove(id)
	return res
}

export async function getDetail(id: number) {
	const res = await fetchDetail(id)
	return res
}

export async function auditOrder({ id, status, reason }: Omit<Audit, 'auditor'>) {
	const data: Audit = {
		id,
		status,
		reason: reason.length === 0 ? '无' : reason,
		auditor: userStroe.roles[0]
	}

	const res = await audit(data)
	return res
}

export async function getAllData() {
	const res = await fetchAllData()
	return res
}

export async function getStockID(area: string) {
	const res = await fetchStockID(area)
	return res
}
