import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagsView extends Partial<RouteLocationNormalizedLoaded> {
  title?: string
}

export interface TagsViewState {
  visitedViews: TagsView[]
  cachedViews: string[]
}
