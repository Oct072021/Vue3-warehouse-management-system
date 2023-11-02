<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { inboundTotal } from '@/api/inbound'
import i18n from '@/lang'
import { mapGetters } from 'vuex'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    type: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      // type_exp: this.type ? 'line' : 'bar',
      // data_exp:this.type?
      // index: this.type ? 0 : 1,
      chartType: ['line', 'bar'],
      // index 0 is profit, index 1 is orders
      GZ: [],
      SZ: [],
      BJ: [],
      SH: []
      // GZ_Total: null,
      // SZ_Total: null,
      // BJ_Total: null,
      // SH_Total: null,
      // GZ_Orders: null,
      // SZ_Orders: null,
      // BJ_Orders: null,
      // SH_Orders: null
    }
  },
  computed: {
    ...mapGetters(['language']),
    index() {
      return this.type ? 0 : 1
    }
  },
  watch: {
    language: {
      handler(val) {
        this.initChart()
      }
    },
    index: {
      handler(val) {
        console.log(val)
        this.initChart()
      }
    }
  },
  mounted() {
    // Control the execution order of async tasks, ensuring that initData() is executed before initChart()
    this.initData().then(() => this.initChart())
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + ' ' + i18n.t(`charts.month`))
        }
        return data
      })()
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: 'statistics',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['GZ', 'SZ', 'BJ', 'SH']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#90979c'
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: 'GZ',
            type: this.chartType[this.index],
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            barMaxWidth: 45,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(52,158,255)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.GZ[this.index]
          },
          {
            name: 'SZ',
            type: this.chartType[this.index],
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.SZ[this.index]
          },
          {
            name: 'BJ',
            type: this.chartType[this.index],
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(20,251,46)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.BJ[this.index]
          },
          {
            name: 'SH',
            type: this.chartType[this.index],
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(226,4,4)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.SH[this.index]
          }
        ]
      })
    },
    async initData() {
      const GZ_res = await this.getTotal('GZ')
      this.GZ[0] = GZ_res.total
      this.GZ[1] = GZ_res.orders
      const SZ_res = await this.getTotal('SZ')
      this.SZ[0] = SZ_res.total
      this.SZ[1] = SZ_res.orders
      const BJ_res = await this.getTotal('BJ')
      this.BJ[0] = BJ_res.total
      this.BJ[1] = BJ_res.orders
      const SH_res = await this.getTotal('SH')
      this.SH[0] = SH_res.total
      this.SH[1] = SH_res.orders
    },
    async getTotal(type) {
      const res = await inboundTotal(type)
      return res.data
    }
  }
}
</script>
