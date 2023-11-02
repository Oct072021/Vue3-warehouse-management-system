<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList!.length - 1"
          class="no-redirect"
          >{{ t(`route.${item.meta!.title}`) }}</span
        >
        <a
          v-else
          @click.prevent="handleLink(item)"
          >{{ t(`route.${item.meta!.title}`) }}</a
        >
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { compile } from 'path-to-regexp'

import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouteLocationRaw, RouteRecordRaw, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const levelList = ref<null | RouteRecordRaw[]>(null)
watch(route, (route) => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})

const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } } as any].concat(matched)
  }

  levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
const isDashboard = (route: RouteRecordRaw) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.toString().trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const pathCompile = (path: string) => {
  // To solve this problem https://github.com/Oct072021/warehouse-management-system/issues/561
  const { params } = route
  var toPath = compile(path)
  return toPath(params)
}
const handleLink = (item: RouteRecordRaw) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as RouteLocationRaw)
    return
  }
  router.push(pathCompile(path))
}

onMounted(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
