const config = [
	{
		type: 'input',
		name: 'title',
		styles: {
			width: '200px'
		},
		event: 'search'
	},
	{
		type: 'select',
		name: 'type',
		styles: {
			width: '140px'
		},
		options: [
			{ key: 'GZ', label: 'GuangZhou(GZ)' },
			{ key: 'SZ', label: 'ShenZhen(SZ)' },
			{ key: 'SH', label: 'ShangHai(SH)' },
			{ key: 'BJ', label: 'BeiJing(BJ)' }
		]
	},
	{
		type: 'select',
		name: 'sort',
		styles: {
			width: '150px'
		},
		options: [
			{ label: 'ID Ascending', key: '+id' },
			{ label: 'ID Descending', key: '-id' }
		]
	},
	{
		type: 'button',
		name: 'Search',
		buttonType: 'primary',
		icon: 'search',
		styles: {
			margin: '0 10px 0 0'
		},
		event: 'search'
	},
	{
		type: 'button',
		name: 'Export',
		buttonType: 'primary',
		icon: 'download',
		styles: {
			margin: '0 10px 0 0'
		},
		event: 'export'
	}
]

export { config }
