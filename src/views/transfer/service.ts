import { SearchData, Audit, Detail, TransferData } from './data'

import { audit, createOrder, fetchAllData, fetchDetail, fetchList, fetchStockID, remove, updateOrder } from './api'
import { useUserStore } from '@/store/user'
import { parseTime } from '@/utils'
import { ElMessage } from 'element-plus'

const userStroe = useUserStore()

export async function createTransferOrder(orderInfo: Detail) {
	orderInfo['timestamp'] = +new Date() + '' // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

	const res = await createOrder(orderInfo)
	return res
}

export async function updateTransferOrder(orderInfo: Detail) {
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

export async function auditOrder(obj: Audit) {
	if (obj.detail.reason === '') {
		obj.detail.reason = '无'
	}
	obj.detail.auditor = userStroe.roles[0]

	const res = await audit(obj)
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
