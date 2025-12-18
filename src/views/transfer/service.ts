import { SearchDTO, AuditDTO, ListVO } from './data'
import { audit, create, all, detailById, page, fetchStockID, remove, update } from './api'

import { useUserStore } from '@/store/user'
import { parseTime } from '@/utils'

const userStroe = useUserStore()

export async function createTransferOrder(orderInfo: ListVO) {
  const { remark } = orderInfo
  Object.assign(orderInfo, {
    timestamp: +new Date() + '',
    remark: remark.length === 0 ? '无' : remark,
  })

  const res = await create(orderInfo)
  return res
}

export async function updateTransferOrder(orderInfo: ListVO) {
  const res = await update(orderInfo)
  return res
}

export async function getTransferOrders(searchList?: SearchDTO) {
  if (searchList && searchList.timestamp) {
    searchList.timestamp = parseTime(+searchList.timestamp, '{y}/{m}/{d}')!
  }
  const res = await page(searchList)
  return res
}

export async function removeTransferOrder(id: ListVO['id']) {
  const res = await remove(id)
  return res
}

export async function getDetail(id: ListVO['id']) {
  const res = await detailById(id)
  return res
}

export async function auditOrder({ id, status, reason }: Omit<AuditDTO, 'auditor'>) {
  const data: AuditDTO = {
    id,
    status,
    reason: reason.length === 0 ? '无' : reason,
    auditor: userStroe.roles[0],
  }

  const res = await audit(data)
  return res
}

export async function getAllData() {
  const res = await all()
  return res
}

export async function getStockID(area: string) {
  const res = await fetchStockID(area)
  return res
}
