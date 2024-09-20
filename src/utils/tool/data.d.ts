export interface Config<T, K> {
	menuList: T[]
	target: keyof T
	mapper: (key: T[keyof T], value: T[]) => K
}