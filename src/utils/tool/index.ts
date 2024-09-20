import { Config } from "./data"
/**
 * 基于某个字段对数据进行分类，根据分类结果生成新数据
 * @param menuList 原始数据
 * @param target 分类基准的目标字段
 * @param mapper 生成新数据的映射函数
 * @returns 新数据
 */
export const generateNewList = <T extends Object, K>({ menuList, target, mapper }: Config<T, K>) => {
	const map = new Map<string, T[]>()
	// 使用Map结构对路由菜单进行分类
	menuList.forEach(menu => {
		const tempKey = JSON.stringify(menu[target])
		if (!map.has(tempKey)) map.set(tempKey, [])
		map.get(tempKey)!.push(menu)
	})

	const newList: K[] = []
	map.forEach((value, key) => {
		const newkey: T[keyof T] = JSON.parse(key)
		const newItem = mapper(newkey, value)
		newList.push(newItem)
	})

	return newList
}