<template>
  <div>
    <div class="filter-container">
      <div v-for="(item, index) in configData" :key="index">
        <el-input
          v-if="item.type==='input'"
          v-model="listQuery[item.name]"
          :placeholder="$t(`stock.${item.name}`)"
          :style="item.styles"
          class="filter-item"
          @keyup.enter.native="buttonClick(item.event)"
        />

        <el-select
          v-if="item.type==='select'"
          v-model="listQuery[item.name]"
          :placeholder="$t(`headers.${item.name}`)"
          :style="item.styles"
          class="filter-item"
          @change="buttonClick(item.event)"
        >
          <el-option
            v-for="opt in item.options"
            :key="opt.key"
            :label="opt.label"
            :value="opt.key"
          />
        </el-select>

        <el-button
          v-if="item.type==='button'"
          v-waves
          class="filter-item"
          :style="item.styles"
          :type="item.buttonType"
          :icon="item.icon"
          @click="buttonClick(item.event)"
        >{{ $t(`headers.${item.name}`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { debounce } from '@/utils/index'

export default {
  name: 'HeaderFilter',
  directives: { waves },
  props: {
    configData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      listQuery: {}
    }
  },
  watch: {
    listQuery: {
      handler: debounce(function(val) {
        this.$emit('buttonClick', val)
      }, 2 * 1000,false),
      deep: true
    }
  },
  methods: {
    buttonClick(event) {
      this.$emit('buttonClick', this.listQuery, event)
    }
  }
}
</script>

<style scoped>
</style>
