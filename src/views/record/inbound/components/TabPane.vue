<template>
  <div>
    <m-Page
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    >
      <template v-slot:table>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" draggable>
          <el-table-column
            v-loading="loading"
            align="center"
            label="#"
            width="65"
            element-loading-text="请给我点时间！"
            prop="id"
          />

          <el-table-column width="180px" :label="$t(`records.itemID`)" prop="itemID" />

          <el-table-column min-width="100px" :label="$t(`records.title`)">
            <template slot-scope="{ row }">
              <span>{{ row.title }}</span>
              <el-tag>{{ row.type }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" :label="$t(`records.date`)">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime("{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t(`records.specs`)" width="95" prop="specs" />

          <el-table-column
            class-name="status-col"
            :label="$t(`records.quantity`)"
            prop="quantity"
            width="110"
          />

          <el-table-column
            class-name="status-col"
            :label="$t(`records.price`)"
            prop="price"
            width="80"
          />

          <el-table-column
            class-name="status-col"
            :label="$t(`records.total`)"
            prop="total"
            width="100"
          />

          <el-table-column
            class-name="status-col"
            :label="$t(`records.mass`)"
            prop="mass"
            width="90"
          />

          <el-table-column
            :label="$t(`records.actions`)"
            align="center"
            width="170"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >{{ $t(`button.edit`) }}</el-button>
              <el-button
                v-if="row.status != 'deleted'"
                size="mini"
                type="danger"
                @click="handleRemove(row, $index)"
              >{{ $t(`button.delete`) }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </m-Page>
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/inbound'
import mPage from '@/components/mPage'
import i18n from '@/lang'

export default {
  components: { mPage },
  props: {
    type: {
      type: String,
      default: 'GZ'
    },
    searchList: {
      type: Object,
      default: () => {
        return {
          sort: '+id',
          title: undefined,
          itemID: undefined
        }
      }
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        title: undefined,
        itemID: undefined,
        type: this.type
      },
      loading: false,
      total: 0
    }
  },
  watch: {
    searchList: {
      handler: function(val) {
        this.resetAlive_search()
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery = { ...this.listQuery, ...this.searchList }
      console.log(this.listQuery)
      this.loading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data.items
        this.loading = false
        this.total = res.data.total
        this.$emit('create', res.data.allItems) // return all data
      })
    },
    handleUpdate(row) {
      this.$emit('handleUpdate', row)
    },
    handleRemove(row, index) {
      remove(row).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: 'Success',
            message: i18n.t(`tips.deleteMsg_success`),
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    resetAlive_search() {
      // To clear keep-alive cache,ensure the operation of the search function
      this.$store.dispatch('alive/removeAlive') // remove keep-alive cache
      this.getList()
      // reset keep-alive cache
      setTimeout(() => {
        this.$store.dispatch('alive/setAlive')
      }, 0)
    }
  }
}
</script>
