import { fetchList, fetchCompList } from './api'

export async function getImgData() {
  const res = await fetchList()
  return res.data.map((item) => item.url)
}
export async function getCompData() {
  const res = await fetchCompList()
  return res.data
}
