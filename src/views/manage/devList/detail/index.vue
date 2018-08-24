<template>
    <div id="detail"
         v-loading="isLoading"
         element-loading-text="拼命加载中"
    >
      <el-row :gutter="20">
        <el-col :lg="10" :xs="24">
          <div class="grid-content bg-purple">
            <el-row :gutter="30">
              <el-col :sm="12" :md="12" :lg="12"  :xs="24">
                <div class="grid-content bg-purple">
                  <img class="dev_img" :src="img_dev" alt="">
                </div>
              </el-col>


              <el-col :sm="12" :md="12" :lg="12" :xs="24">
                <div class="grid-content bg-purple">
                  <ul class="params">
                    <li>
                      <span class="param_title">设备名称:</span>
                      <span class="param_value">A6-ZJX</span>
                    </li>
                    <li>
                      <span class="param_title">设备品牌:</span>
                      <span class="param_value">001</span>
                    </li>
                    <li>
                      <span class="param_title">机床品牌:</span>
                      <span class="param_value">002</span>
                    </li>
                    <li>
                      <span class="param_title">状态:</span>
                      <span class="param_value">开机</span>
                    </li>
                    <li>
                      <span class="param_title">加工产品:</span>
                      <span class="param_value">玻璃</span>
                    </li>
                    <li>
                      <span class="param_title">实时状态数量:</span>
                      <span class="param_value">10</span>
                    </li>

                    <li>
                      <span class="param_title">历史状态数量:</span>
                      <span class="param_value">15</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-col>
        <el-col :lg="14" :xs="24">
          <div class="grid-content bg-purple">
            <el-row :gutter="30">
              <el-col :sm="8" :xs="24">
                <GuageChart title="完成率"></GuageChart>
              </el-col>

              <el-col :sm="8" :xs="24">
                <GuageChart title="良品率"></GuageChart>
              </el-col>

              <el-col :sm="8" :xs="24">
                <GuageChart title="开动率"></GuageChart>
              </el-col>

            </el-row>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :lg="8" :md="24" >
          <el-table class="tablelist" :data="list" v-loading="listLoading" style="width: 100%;" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column label="状态名"  align="center">
                <template slot-scope="scope">
                  {{scope.row.statusName}}
                </template>
              </el-table-column>

            <el-table-column label="状态值"  align="center">
              <template slot-scope="scope">
                {{scope.row.statusVal}}
              </template>
            </el-table-column>

          </el-table>

        </el-col>


        <el-col :lg="8" :md="12">
          <LineChart></LineChart>

        </el-col>

        <el-col :lg="8" :md="12">
          <BarChart></BarChart>

        </el-col>

      </el-row>


    </div>
</template>

<script>
  import img_dev from '@/assets/detail_images/zcj.png'
  import GuageChart from './components/GaugeChart';
  import LineChart from './components/LineChart';
  import BarChart from './components/BarChart';
    export default {
        name: 'detail',
        components:{
          GuageChart,
          LineChart,
          BarChart
        },
        data(){
            return {
              img_dev,
                //id:this.$route.params.id
              isLoading:true,
              list:null,
              listLoading:false
          }
        },
      mounted(){
          setTimeout(()=>{
              this.list=[
                {
                    statusName:"status1",
                    statusVal:"299"
                },
                {
                  statusName:"status2",
                  statusVal:"333"
                },
                {
                  statusName:"status3",
                  statusVal:"355"
                }
                ,
                {
                  statusName:"status4",
                  statusVal:"0"
                }
                ,
                {
                  statusName:"status5",
                  statusVal:"0"
                },
                {
                  statusName:"status6",
                  statusVal:"0"
                }
              ];
              this.isLoading=false;
          },1500)
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #detail{
      padding: 35px 40px;
      width: 100%;
      height: 100%;

      .tablelist{
        margin-top: 30px;
      }

      .dev_img{
        width: 100%;
      }

      .params{
        list-style: none;
        padding: 0;
        margin: 20px;
        li{
          width: 90%;
          white-space: nowrap;
          margin: 0 auto;
          margin-bottom: 25px;
          .param_title{
            color: #999;
            width: 80px;
            display: inline-block;
          }
          .param_value{
            margin-left: 20px;
            color: #333;
          }
        }

      }


  }
</style>
