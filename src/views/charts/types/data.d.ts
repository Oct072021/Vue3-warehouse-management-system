export interface AllData {
	[index: string]: Data
}

export interface Data {
	total: number[]
	orders: number[]
	type: { [index: string]: number }
}
