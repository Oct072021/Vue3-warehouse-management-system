/**
 * transform object to select array
 * @param {Object} obj
 * @returns {Array}
 */
export function obj2Option(obj: { [index: string]: string }) {
	const arr = []
	for (let i in obj) {
		arr.push({ key: i, label: obj[i] })
	}
	return arr
}
