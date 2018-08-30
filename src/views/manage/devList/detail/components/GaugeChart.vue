<template>
    <div  class="chartbody">

      <span>{{title}}</span>
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
        default: '350px'
      },
      title:{
          type:String,
          default:"标题"
      },
      value:{
        type:Number,
        default:0
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
        this.chart.setOption( {
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {

            }
          },
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: this.value, name: this.title}
              ]
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
