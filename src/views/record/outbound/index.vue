<template>
  <div class="tab-container">
    <el-tag>mounted times : {{ createdTimes }}</el-tag>
    <el-alert
      :closable="false"
      style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;"
      title="Tab with keep-alive"
      type="success"
    />
    <HeaderFilter :config-data="config" @buttonClick="buttonClick" />

    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive :include="alive">
          <tab-pane
            v-if="activeName == item.key"
            :ref="item.key"
            :key="item.key"
            :type="item.key"
            :search-list="list"
            @create="showCreatedTimes"
            @handleUpdate="handleUpdate"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="10vh">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t(`records.warehouse`)" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`records.itemID`)" prop="itemID">
          <el-input v-model="temp.itemID" />
        </el-form-item>
        <el-form-item :label="$t(`records.title`)" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t(`records.client`)" prop="client">
          <el-input v-model="temp.client" />
        </el-form-item>
        <el-form-item :label="$t(`records.specs`)" prop="specs">
          <el-input v-model="temp.specs">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t(`records.quantity`)" prop="quantity">
          <el-input v-model="temp.quantity" />
        </el-form-item>
        <el-form-item :label="$t(`records.price`)" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item :label="$t(`records.mass`)" prop="mass">
          <el-input v-model="temp.mass">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" style="float: left">{{ $t(`button.scan`) }}</el-button>
        <el-button @click="dialogFormVisible = false">{{ $t(`button.delete`) }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? create() : update()"
        >{{ $t(`button.confirm`) }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/outbound'
import TabPane from './components/TabPane'
import HeaderFilter from '@/components/HeaderFilter'
import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'
import { config } from './config'
import i18n from '@/lang'

const calendarTypeOptions = [
  { key: 'GZ', display_name: 'GuangZhou' },
  { key: 'SZ', display_name: 'ShenZhen' },
  { key: 'SH', display_name: 'ShangHai' },
  { key: 'BJ', display_name: 'BeiJing' }
]

export default {
  name: 'Tab',
  components: { TabPane, HeaderFilter },
  data() {
    return {
      config,
      tabMapOptions: [
        { label: 'GuangZhou', key: 'GZ' },
        { label: 'ShangHai', key: 'SH' },
        { label: 'BeiJing', key: 'BJ' },
        { label: 'ShenZhen', key: 'SZ' }
      ],
      activeName: 'GZ',
      createdTimes: 0,
      downloadLoading: false,
      allData: null,
      list: {
        title: undefined,
        itemID: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      dialogFormVisible: false,
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        itemID: [
          { required: true, message: 'itemID is required', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        client: [
          { required: true, message: 'client is required', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: 'specs is required', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'quantity is required', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'price is required', trigger: 'blur' }
        ],
        mass: [{ required: true, message: 'mass is required', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        itemID: '',
        client: '',
        specs: 0,
        quantity: 0,
        price: 0,
        total: 0,
        title: '',
        type: '',
        mass: 0
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      }
    }
  },
  computed: {
    alive() {
      return this.$store.getters.alive
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    buttonClick(data, e) {
      this.list = { ...this.list, ...data }
      if (e === 'search') {
        this.handleFilter()
      } else if (e === 'add') {
        this.handleCreate()
      } else if (e === 'export') {
        this.handleDownload()
      }
    },
    showCreatedTimes(data) {
      this.createdTimes = this.createdTimes + 1
      this.allData = data
    },
    handleDownload: throttle(function() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          'itemID',
          'title',
          'data',
          'specs',
          'quantity',
          'price',
          'total',
          'mass'
        ]
        const filterVal = [
          'itemID',
          'title',
          'timestamp',
          'specs',
          'quantity',
          'price',
          'total',
          'mass'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `outbound-list-${this.activeName}`
        })
        this.downloadLoading = false
      })
    }, 5 * 1000),
    formatJson(filterVal) {
      return this.allData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleFilter() {
      const temp = this.$refs
      for (const key in temp) {
        if (temp[key].length !== 0) {
          temp[key][0].resetAlive_search() // invoke children component method
          break
        }
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        itemID: '',
        specs: '',
        timestamp: new Date(),
        title: '',
        quantity: 0,
        price: 0,
        total: 0,
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    create() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.total = this.temp.price * this.temp.quantity
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          this.temp.timestamp = +new Date(this.temp.timestamp)
          createArticle(this.temp).then(res => {
            if (res.code === 20000) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: i18n.t(`tips.createMsg_success`),
                type: 'success',
                duration: 2000
              })
              // refresh the view
              this.handleFilter()
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    update() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(res => {
            if (res.code === 20000) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: i18n.t(`tips.updateMsg_success`),
                type: 'success',
                duration: 2000
              })
              // refresh the view
              this.handleFilter()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
