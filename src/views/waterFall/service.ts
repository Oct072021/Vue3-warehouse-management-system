import { fetchList } from './api'

export async function getImgData() {
  const res = await fetchList()
  return res.data.map((item) => item.url)
}
