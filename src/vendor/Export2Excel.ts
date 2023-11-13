/* eslint-disable */
import { saveAs } from 'file-saver'
import { BookType, WorkBook, WorkSheet } from 'xlsx'
import * as XLSX from 'xlsx'

import { Export, ICell } from './data.d'

class Workbook implements WorkBook {
	SheetNames: string[] = []
	Sheets: { [sheet: string]: WorkSheet } = {}
}

function datenum(v: Date) {
	var epoch = Date.parse(v + '')
	return (epoch - +new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data: any) {
	var ws: { [index: string]: any } = {}
	var range = {
		s: {
			c: 10000000,
			r: 10000000
		},
		e: {
			c: 0,
			r: 0
		}
	}
	for (var R = 0; R != data.length; ++R) {
		for (var C = 0; C != data[R].length; ++C) {
			if (range.s.r > R) range.s.r = R
			if (range.s.c > C) range.s.c = C
			if (range.e.r < R) range.e.r = R
			if (range.e.c < C) range.e.c = C
			var cell: ICell = {
				v: data[R][C],
				t: '',
				z: ''
			}
			if (cell.v == null) continue
			var cell_ref = XLSX.utils.encode_cell({
				c: C,
				r: R
			})

			if (typeof cell.v === 'number') cell.t = 'n'
			else if (typeof cell.v === 'boolean') cell.t = 'b'
			else if (cell.v instanceof Date) {
				cell.t = 'n'
				cell.z = XLSX.SSF._table[14]
				cell.v = datenum(cell.v)
			} else cell.t = 's'

			ws[cell_ref] = cell
		}
	}
	if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
	return ws
}

// function Workbook() {
// 	if (!(this instanceof Workbook)) return new Workbook()
// 	this.SheetNames = []
// 	this.Sheets = {}
// }

function s2ab(s: string) {
	var buf = new ArrayBuffer(s.length)
	var view = new Uint8Array(buf)
	for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
	return buf
}

export function export_json_to_excel({
	multiHeader = [],
	header,
	data,
	filename,
	merges = [],
	autoWidth = true,
	bookType = 'xlsx'
}: Export) {
	/* original data */
	filename = filename || 'excel-list'
	data = [...data]
	data.unshift(header)

	for (let i = multiHeader.length - 1; i > -1; i--) {
		data.unshift(multiHeader[i])
	}

	const ws_name = 'SheetJS'
	const wb = new Workbook()
	const ws = sheet_from_array_of_arrays(data)

	if (merges.length > 0) {
		if (!ws['!merges']) ws['!merges'] = []
		merges.forEach(item => {
			ws['!merges'].push(XLSX.utils.decode_range(item))
		})
	}

	if (autoWidth) {
		/*Sets the max width of each column of the worksheet*/
		const colWidth = data.map((row: any) =>
			row.map((val: any) => {
				/*is null or undefined*/
				if (val == null) {
					return {
						wch: 10
					}
				} else if (val.toString().charCodeAt(0) > 255) {
					/*is Chinese*/
					return {
						wch: val.toString().length * 2
					}
				} else {
					return {
						wch: val.toString().length
					}
				}
			})
		)
		/*first row is the init value*/
		let result = colWidth[0]
		for (let i = 1; i < colWidth.length; i++) {
			for (let j = 0; j < colWidth[i].length; j++) {
				if (result[j]['wch'] < colWidth[i][j]['wch']) {
					result[j]['wch'] = colWidth[i][j]['wch']
				}
			}
		}
		ws['!cols'] = result
	}

	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name)
	wb.Sheets[ws_name] = ws

	var wbout = XLSX.write(wb, {
		bookType: bookType as BookType,
		bookSST: false,
		type: 'binary'
	})
	saveAs(
		new Blob([s2ab(wbout)], {
			type: 'application/octet-stream'
		}),
		`${filename}.${bookType}`
	)
}
