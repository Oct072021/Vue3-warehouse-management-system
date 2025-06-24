// transform object to select array
export function obj2Option<T>(obj: T) {
  const arr = []
  for (let i in obj) {
    arr.push({ key: i, label: obj[i] })
  }
  return arr
}
