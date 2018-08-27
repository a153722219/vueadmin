<template>
  <div class="dashboard-container">
    <panel-group :activeDevCount="panelData.activeDevCount" :activeUserCount="panelData.activeUserCount" :devCount="panelData.devCount" :userCount="panelData.userCount"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>


    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 10}" :xl="{span: 11}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table :list="onlineData"></transaction-table>
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}" style="padding-right:8px;margin-bottom:30px;">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}" :xl="{span: 5}" style="margin-bottom:30px;">
          <box-card :cardData="cardData"></box-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './component/PanelGroup'
import LineChart from './component/LineChart'
import BarChart from './component/BarChart'
import TransactionTable from './component/TransactionTable'
import BoxCard from './component/BoxCard'
import fetchChart from '@/api/fetchChart'
import { fetchOnlineTime } from '@/api/fetchOnlineTime'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components:{
    PanelGroup,
    LineChart,
    TransactionTable,
    BarChart,
    BoxCard
  },
  methods: {

  },

  mounted(){
      //获取顶部图表数据
    fetchChart().then(res=>{
        this.lineChartData.dateActiveCount=res.data.dateActiveCount.reverse();
        this.lineChartData.dateRegCount=res.data.dateRegCount.reverse();
        this.panelData.activeDevCount=res.data.activeDevCount;
        this.panelData.activeUserCount=res.data.activeUserCount;
        this.panelData.devCount=res.data.devCount;
        this.panelData.userCount=res.data.userCount;
    });


    fetchOnlineTime().then(res=>{

        this.onlineData=res.data.activeUsers;
        this.cardData.comvailCount=res.data.comvailCount;
        this.cardData.inrealnameCount=res.data.inrealnameCount;
        this.cardData.realnameCount=res.data.realnameCount;
    });

  },

  data(){
    return {
      lineChartData: {
        dateActiveCount:[],
        dateRegCount:[]
      },
      panelData:{
        activeDevCount:0,
        activeUserCount:0,
        devCount:0,
        userCount:0
      },
      onlineData:[],
      cardData:{
        comvailCount:0,
        inrealnameCount:0,
        realnameCount:0
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

}
</style>
