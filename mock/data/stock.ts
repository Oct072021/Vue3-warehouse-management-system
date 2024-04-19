import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const stockArr: any[] = []

for (let i = 1; i <= 700; i++) {
	stockArr.push(
		Mock.mock({
			id: i,
			orderID: `@guid()`,
			specs: '@integer(1, 100)*@integer(1, 100)',
			title: `stock ${i} `,
			'area|1': ['area-1', 'area-2', 'area-3', 'area-4'],
			quantity: '@integer(0, 100)',
			mass: '@float(10, 50, 0, 2)'
		})
	)
}

export default [
	{
		url: '/vue-element-admin/stock/list',
		method: 'get',
		response: ({ query }) => {
			const { area, title, page = 1, limit = 20, sort } = query
			// simulate search
			let mockList = stockArr.filter(item => {
				if (area && item.area !== area) return false
				if (title && item.title.indexOf(title) < 0) return false
				return true
			})
			// sort
			if (sort === '-id') {
				mockList = mockList.reverse()
			}

			// Pagination
			const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
			return {
				code: 20000,
				data: {
					total: mockList.length,
					items: pageList
				}
			}
		}
	},

	{
		url: '/vue-element-admin/stock/detail',
		method: 'get',
		response: ({ query }) => {
			const { id } = query
			for (const item of stockArr) {
				if (item.id === +id) {
					return {
						code: 20000,
						data: item
					}
				}
			}
		}
	},

	{
		url: '/vue-element-admin/stock/update',
		method: 'post',
		response: ({ body }) => {
			const index = stockArr.findIndex(v => v.id === body.id)
			stockArr.splice(index, 1, body)

			return {
				code: 20000,
				message: 'success',
				data: {}
			}
		}
	},

	{
		url: '/vue-element-admin/stock/remove',
		method: 'post',
		response: ({ body }) => {
			const index = stockArr.findIndex(v => v.id === body.id)
			stockArr.splice(index, 1)

			return {
				code: 20000,
				message: 'success',
				data: {}
			}
		}
	}
] as MockMethod[]
