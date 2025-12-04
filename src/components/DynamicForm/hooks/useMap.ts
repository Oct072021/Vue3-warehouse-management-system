import {
  ElAutocomplete,
  ElButton,
  ElCascader,
  ElCheckbox,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElInputTag,
  ElRadio,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
} from 'element-plus'
import { Component } from 'vue'

export const useMap = () => {
  const componentsMap: { [key: string]: Component } = {
    input: ElInput,
    inputNumber: ElInputNumber,
    inputTag: ElInputTag,
    autoComplete: ElAutocomplete,
    cascader: ElCascader,
    colorPicker: ElColorPicker,
    number: ElInputNumber,
    select: ElSelect,
    treeSelect: ElTreeSelect,
    radio: ElRadio,
    checkbox: ElCheckbox,
    switch: ElSwitch,
    date: ElDatePicker,
    time: ElTimePicker,
    rate: ElRate,
    slider: ElSlider,
    transfer: ElTransfer,
    upload: ElUpload,
    button: ElButton,
  }
  return {
    componentsMap,
  }
}
