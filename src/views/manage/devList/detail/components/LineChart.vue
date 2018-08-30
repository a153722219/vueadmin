<template>
  <div  class="chartbody">

    <div :class="className" ref="chart" :style="{height:height,width:width}"></div>

  </div>

</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  const animationDuration = 6000

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      hData:{
          type:Object,
          default:function () {
             return {
                 note:"",
                 tData:[],
                 sData:[]
             }
          }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        //this.chart = echarts.init(this.$el, 'macarons')
        this.chart = echarts.init(this.$refs.chart, 'macarons')

        this.pain();
      },

      pain(){
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        this.chart.setOption( {
          color: colors,

          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data:[this.hData.note]
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '数据  ' + params.value
                      + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: this.hData.tData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name:this.hData.note,
              type:'line',
              smooth: true,
              data: this.hData.sData
            }
          ]
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chartbody{
    margin-top: 20px;
  }

</style>
