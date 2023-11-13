export interface ICell {
	v: Date | number | boolean | string
	t: string
	z: string
}

export interface Export {
	multiHeader?: string[][]
	header: string[]
	data: any
	filename: string
	merges?: any[]
	autoWidth?: boolean
	bookType?: string
}
