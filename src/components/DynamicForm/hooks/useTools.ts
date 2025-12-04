import { FormItem } from '../data.d'
import { omit } from 'lodash-es'
import { v4 as uuid } from 'uuid'

import { useMap } from './useMap'

export const useTools = () => {
  const rootProps = ['label', 'key', 'type', 'slots', 'events', 'hidden']
  const getProps = (item: FormItem) => {
    if (item.props) return item.props
    return omit(item, rootProps)
  }

  const { componentsMap } = useMap()
  const getComponents = (item: FormItem) => {
    if (typeof item.type !== 'string') return item.type
    return componentsMap[item.type]
  }

  const getFormItemProps = (item: FormItem) => {
    const { label, key } = item
    return {
      label,
      key: key || uuid(),
      ...(item.key && { prop: key }),
    }
  }

  const getSlots = (slotsMap?: FormItem['slots']) => {
    if (!slotsMap) return []
    if (typeof slotsMap === 'string') return [{ name: 'default', content: slotsMap }]
    return Object.keys(slotsMap).map((key) => ({
      name: key,
      content: slotsMap[key],
    }))
  }

  return {
    getProps,
    getComponents,
    getFormItemProps,
    getSlots,
  }
}
