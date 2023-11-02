<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
    ref="root"
  >
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tagRef"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path!, query: tag.query }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ t(`route.${tag.meta!.title}`) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ScrollPane from './ScrollPane.vue'

import path from 'path-browserify'

import { computed, nextTick, onBeforeMount, onMounted, provide, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useTagsViewStore } from '@/store/tagsView'
import { usePermissionStore } from '@/store/permission'
import { TagsView } from '@/store/tagsView/data.d'

emit: ['click.middle', 'contextmenu.prevent']

const tagRef = ref()
provide('tagRef', tagRef)

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()

const scrollPaneRef = ref()
const root = ref()

const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<TagsView>({})
const affixTags = ref<TagsView[]>([])

const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
})
const routes = computed(() => {
  return permissionStore.routes
})

watch(route, () => {
  addTags()
  moveToCurrentTag()
})
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onBeforeMount(() => {
  initTags()
  addTags()
})

const isActive = (_route: TagsView) => {
  return _route.path === route.path
}
const isAffix = (tag: TagsView) => {
  return tag.meta && tag.meta.affix
}
const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagsView[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path!)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const _affixTags = (affixTags.value = filterAffixTags(routes.value))
  for (const tag of _affixTags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}
const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
  return false
}
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tagRef.value) {
      if (tag.to.path === route.path) {
        scrollPaneRef.value.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}
const refreshSelectedTag = (view: TagsView) => {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  })
}
const closeSelectedTag = (view: TagsView) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  router.push(selectedTag.value!.fullPath!)
  tagsViewStore.delOthersViews(selectedTag.value!).then(() => {
    moveToCurrentTag()
  })
}
const closeAllTags = (view: TagsView) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (affixTags.value!.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews: TagsView[], view: TagsView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath!)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}
const openMenu = (tag: TagsView, e: MouseEvent) => {
  const menuMinWidth = 105
  const offsetLeft = root.value.getBoundingClientRect().left // container margin left
  const offsetWidth = root.value.offsetWidth // container width
  const _maxLeft = offsetWidth - menuMinWidth // left boundary
  const _left = e.clientX - offsetLeft + 15 // 15: margin right

  if (_left > _maxLeft) {
    left.value = _maxLeft
  } else {
    left.value = _left
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}
const closeMenu = () => {
  visible.value = false
}
const handleScroll = () => {
  closeMenu()
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
