import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const transferArr: any[] = []

for (let i = 1; i <= 600; i++) {
	const production: any[] = []
	for (let j = 1; j <= 4; j++) {
		production.push({
			productionID: `08016${j}`,
			productionName: `设备${j}`,
			quantity: '@integer(0, 100)',
			'unit|1': ['EA', 'PCS', 'SET']
		})
	}
	const status = Mock.Random.integer(0, 2)
	const auditor = status === 0 ? '' : 'Sam'
	const reason = status === 0 ? '' : 'xxxxxxxxx'
	const tempArr = Mock.Random.shuffle(['area-1', 'area-2', 'area-3', 'area-4']).slice(0, 2)
	transferArr.push(
		Mock.mock({
			id: i,
			orderID: `TRA${10000 + i}`,
			correlationID: `000${2 + i}`,
			timestamp: "@date('2022/MM/dd')",
			batch: "@date('2023MMdd')",
			origin: tempArr[0],
			new: tempArr[1],
			documenter: 'Sekiro',
			status,
			auditor,
			remark: '无',
			reason,
			production
		})
	)
}

export default [
	{
		url: '/vue-element-admin/transfer/list',
		method: 'get',
		response: ({ query }) => {
			const { orderID, timestamp, page = 1, limit = 20, status } = query

			// simulate search
			let mockList = transferArr.filter(item => {
				if (timestamp && item.timestamp !== timestamp) return false
				if (status && ('' + item.status).indexOf(status) < 0) return false
				if (orderID && item.orderID.indexOf(orderID) < 0) return false
				return true
			})

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
		url: '/vue-element-admin/transfer/all',
		method: 'get',
		response: () => {
			return {
				code: 20000,
				data: transferArr
			}
		}
	},

	{
		url: '/vue-element-admin/transfer/detail',
		method: 'get',
		response: ({ query }) => {
			const { id } = query
			for (const item of transferArr) {
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
		url: '/vue-element-admin/transfer/audit',
		method: 'put',
		response: ({ body }) => {
			const { id, status, reason, auditor } = body
			const index = transferArr.findIndex(v => v.id === id)

			Object.assign(transferArr[index], { status, reason, auditor })
			// transferArr[index].reason=reason
			// detail.status = status
			// transferArr.splice(index, 1, detail)

			return {
				code: 20000,
				data: {},
				message: 'success'
			}
		}
	},

	{
		url: '/vue-element-admin/transfer/create',
		method: 'post',
		response: ({ body }) => {
			body.id = transferArr.length + 1
			body['status'] = 0
			body.orderID = `TRA${10000 + transferArr.length + 1}`
			transferArr.unshift(body)

			return {
				code: 20000,
				message: 'success',
				data: {}
			}
		}
	},

	{
		url: '/vue-element-admin/transfer/update',
		method: 'post',
		response: ({ body }) => {
			const index = transferArr.findIndex(v => v.id === body.id)
			transferArr.splice(index, 1, body)

			return {
				code: 20000,
				message: 'success',
				data: {}
			}
		}
	},

	{
		url: '/vue-element-admin/transfer/remove',
		method: 'delete',
		response: ({ query }) => {
			const index = transferArr.findIndex(v => v.id == query.id)
			transferArr.splice(index, 1)

			return {
				code: 20000,
				message: 'success',
				data: {}
			}
		}
	}
] as MockMethod[]

export { transferArr }
