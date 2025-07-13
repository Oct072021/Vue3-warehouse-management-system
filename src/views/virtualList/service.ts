import { fetchList } from './api'

export async function getListData() {
  const res = await fetchList()
  return res.data
}
