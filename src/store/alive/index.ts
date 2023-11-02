import { defineStore } from 'pinia'

import { AliveState } from './data.d'

export const useAliveStore = defineStore('alive', {
  state: (): AliveState => ({
    aliveComp: 'tab-pane',
  }),
  actions: {
    removeAlive() {
      this.aliveComp = ' '
    },
    setAlive() {
      this.aliveComp = 'tab-pane'
    },
  },
})
