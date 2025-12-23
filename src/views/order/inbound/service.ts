import { SearchDTO, AuditDTO, CreateDTO, UpdateDTO, ListVO } from './data'

import { audit, create, all, detailById, page, remove, update } from './api'
import { useUserStore } from '@/store/user'

const userStroe = useUserStore()

export async function createOrder(orderInfo: CreateDTO) {
  orderInfo['timestamp'] = +new Date() + '' // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

  const res = await create(orderInfo)
  return res
}

export async function updateOrder(orderInfo: UpdateDTO) {
  const res = await update(orderInfo)
  return res
}

export async function getList(searchList?: SearchDTO) {
  const res = await page(searchList)
  return res
}

export async function removeOrder(id: ListVO['id']) {
  const res = await remove(id)
  return res
}

export async function detailOrder(id: ListVO['id']) {
  const res = await detailById(id)
  return res
}

export async function auditOrder(obj: AuditDTO) {
  if (obj.detail.reason === '') {
    obj.detail.reason = '无'
  }
  obj.detail.auditor = userStroe.roles[0]

  const res = await audit(obj)
  return res
}

export async function allData({ area }: SearchDTO) {
  const res = await all(area)
  return res
}
