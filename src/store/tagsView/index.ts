import { defineStore } from 'pinia'

import { TagsViewState, TagsView } from './data.d'

export const useTagsViewStore = defineStore('tagView', {
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    addVisitedView(view: TagsView) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta!.title || 'no-name',
        }),
      )
    },

    addCachedView(view: TagsView) {
      if (this.cachedViews.includes(view.name as string)) return
      if (!view.meta!.noCache) {
        this.cachedViews.push(view.name as string)
      }
    },

    delView(view: TagsView): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },

    delVisitedView(view: TagsView) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },

    delCachedView(view: TagsView) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },

    delOthersViews(view: TagsView): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.delOthersCachedViews(view)
        this.delOthersVisitedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },

    delOthersVisitedViews(view: TagsView) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta!.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },

    delOthersCachedViews(view: TagsView) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },

    delAllViews(): Promise<TagsViewState> {
      return new Promise((resolve) => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },

    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter((tag) => tag.meta!.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },

    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view: TagsView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
