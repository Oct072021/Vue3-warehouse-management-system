import {
  ElButton,
  ElCheckbox,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElSelect,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'
import { Component } from 'vue'

export const useMap = () => {
  const componentsMap: { [key: string]: Component } = {
    input: ElInput,
    number: ElInputNumber,
    select: ElSelect,
    radio: ElRadio,
    checkbox: ElCheckbox,
    switch: ElSwitch,
    date: ElDatePicker,
    daterange: ElDatePicker,
    time: ElTimePicker,
    timerange: ElTimePicker,
    textarea: ElInput,
    button: ElButton,
  }
  return {
    componentsMap,
  }
}
