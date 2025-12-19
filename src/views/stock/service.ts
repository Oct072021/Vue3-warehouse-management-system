import { page } from './api'
import { SearchDTO } from './data.d'

export async function getList(searchList: SearchDTO) {
  const res = await page(searchList)
  return res
}
