import { defineStore } from 'pinia'

import { AliveState } from './data.d'

export const useAliveStore = defineStore('alive', {
  state: (): AliveState => ({
    aliveComp: 'TabPane',
  }),
  actions: {
    removeAlive() {
      this.aliveComp = ' '
    },
    setAlive() {
      this.aliveComp = 'TabPane'
    },
  },
})
