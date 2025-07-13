import { defineStore } from 'pinia'

import { ErrorLogState, Log } from './data.d'

export const useErrorLogStore = defineStore('errorLog', {
  state: (): ErrorLogState => ({
    logs: [],
  }),
  actions: {
    addErrorLog(log: Log) {
      this.logs.push(log)
    },
    clearErrorLog() {
      this.logs.splice(0)
    },
  },
})
