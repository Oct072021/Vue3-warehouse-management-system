<script lang="tsx">
import { VNode, h } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props: any) {
    const render = () => {
      const { icon } = props
      const vnodes: VNode[] = []

      if (icon) {
        if (icon.includes('el-icon')) {
          const icons = ElementPlusIconsVue
          const compName = icon.charAt(8).toUpperCase() + icon.slice(9)
          const temp = h(ElIcon, {}, [h(icons[compName])])
          vnodes.push(temp)
        } else {
          const temp = h(<SvgIcon iconClass={icon} />)
          vnodes.push(temp)
        }
      }

      return vnodes
    }

    return () => render()
  },
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
