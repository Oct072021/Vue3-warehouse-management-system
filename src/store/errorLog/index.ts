import { defineStore } from 'pinia'

import { ErrorLogState, Log } from './data.d'

export const useErrorLogStore = defineStore('errorLog', {
  state: (): ErrorLogState => ({
    logs: [
      {
        err: {
          message: 'Cannot read properties of undefined (reading "total")',
          stack: 'TypeError:Cannot read properties of undifine(reading "total") at .........',
        },
        info: 'Operation Fail',
        url: 'https://github.com',
      },
      {
        err: {
          message: 'Uncaught(in promise) TypeError: Fail to fetch',
          stack: 'Uncaught(in promise) TypeError: Fail to fetch',
        },
        info: 'ERR_NETWORK',
        url: 'https://github.com/Oct072021/warehouse-management-system',
      },
    ],
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
