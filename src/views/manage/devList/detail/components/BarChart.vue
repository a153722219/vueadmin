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
        default: '370px'
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
        this.chart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          legend: {
            data:[this.hData.note]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.hData.rData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:this.hData.note,
              type:'bar',
              barWidth: '60%',
              data:this.hData.sData
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
