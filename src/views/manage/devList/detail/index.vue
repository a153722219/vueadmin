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
                      <span class="param_value">{{devInfo.devName}}</span>
                    </li>
                    <li>
                      <span class="param_title">设备品牌:</span>
                      <span class="param_value">{{devInfo.MtInf}}</span>
                    </li>
                    <li>
                      <span class="param_title">机床品牌:</span>
                      <span class="param_value">{{devInfo.CtrlInf}}</span>
                    </li>
                    <li>
                      <span class="param_title">状态:</span>
                      <span class="param_value">{{devInfo.runState | statusFilter}}</span>
                    </li>
                    <li>
                      <span class="param_title">MAC:</span>
                      <span class="param_value">{{devInfo.mac}}</span>
                    </li>
                    <li>
                      <span class="param_title">实时状态数量:</span>
                      <span class="param_value">{{devInfo.rCnt}}</span>
                    </li>

                    <li>
                      <span class="param_title">历史状态数量:</span>
                      <span class="param_value">{{devInfo.hCnt}}</span>
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
                <GuageChart ref="guage1" :value="gaugeVal.val1" title="完成率"></GuageChart>
              </el-col>

              <el-col :sm="8" :xs="24">
                <GuageChart ref="guage2" :value="gaugeVal.val2" title="良品率"></GuageChart>
              </el-col>

              <el-col :sm="8" :xs="24">
                <GuageChart ref="guage3" :value="gaugeVal.val3" title="开动率"></GuageChart>
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
                  {{noteMap.get(scope.row.stateId)}}
                </template>
              </el-table-column>

            <el-table-column label="状态值"  align="center">
              <template slot-scope="scope">
                {{scope.row.value}}
              </template>
            </el-table-column>

          </el-table>

        </el-col>


        <el-col :lg="8" :md="12">
          <LineChart :hData="hS1Data" ref="line1"></LineChart>

        </el-col>

        <el-col :lg="8" :md="12">
          <BarChart :hData="hS2Data"  ref="bar1"></BarChart>

        </el-col>

      </el-row>


    </div>
</template>

<script>
  import img_dev from '@/assets/detail_images/zcj.png'
  import GuageChart from './components/GaugeChart';
  import LineChart from './components/LineChart';
  import BarChart from './components/BarChart';
  import fetchStateNotes from '@/api/fetchStateNotes';
  import fetchrStates from '@/api/fetchrStates';
  import fetchDevInfo from '@/api/fetchDevInfo';
  import fetchHistory from '@/api/fetchHistory';
    export default {
        name: 'detail',
        components:{
          GuageChart,
          LineChart,
          BarChart
        },
        filters:{
              statusFilter(s){
                  if(s==0)
                      return "关机";
              },
        },
        data(){
            return {
              img_dev,
                //id:this.$route.params.id
              isLoading:true,
              list:null,
              listLoading:true,
              devId:null,
              rTimers:null,
              states:{
                  rStates:[],
                  hStates:[]
              },
              gaugeVal:{val1:0,val2:0,val3:0},
              noteMap:[],
              devInfo:{
                  devName:"loading..",
                  MtInf:"loading..",
                  CtrlInf:"loading..",
                  runState:0,
                  mac:"loading..",
                  rCnt:"loading..",
                  hCnt:"loading.."
              },
              hS1Data:{
                  sId:null,
                  tData:[],
                  sData:[]
              },
              hS2Data:{
                sId:null,
                tData:[],
                sData:[]
              }

          }
        },
      beforeDestroy(){
        clearInterval(this.rTimers)
      },

      mounted(){
        //获取状态注释
        this.devId=parseInt(this.$route.params.id);

        fetchDevInfo(this.devId).then(res=>{
            this.devInfo.devName=res.data[0].name;
            this.devInfo.MtInf=res.data[0].minf;
            this.devInfo.CtrlInf=res.data[0].cinf;
            this.devInfo.runState=res.data[0].onlineState;
            this.devInfo.mac=res.data[0].mac;
            this.devInfo.rCnt=res.data[0].rStateCnt;
            this.devInfo.hCnt=res.data[0].hstatecnt;
        });

        fetchStateNotes(JSON.stringify([this.devId])).then(res=>{
            let states = res.data[0].states;
            this.noteMap=new Map();
            for(let i=0;i<res.data[0].states.length;i++){
              if(states[i].type==1 || states[i].type==3){
                  this.states.rStates.push({
                    sId: states[i].sId
                  });
              }
              if(states[i].type==2 || states[i].type==3){
                this.states.hStates.push({
                  sId: states[i].sId
                });
              }

              this.noteMap.set(states[i].sId,states[i].notes.note);
            }

            let par =[
              {
                  devId:this.devId,
                  sId:[]
              }
            ];

            for(let i in this.states.rStates){
              par[0].sId.push(this.states.rStates[i].sId)
            }

            par = JSON.stringify(par);

            this.rTimers=setInterval(()=>{
                fetchrStates(par).then(res=>{
                    this.list=res.data[0].states;
                    for(let i in this.list){
                        if(this.noteMap.get(this.list[i].stateId)=="完成率"){
                          this.gaugeVal.val1=parseInt(this.list[i].value);
                          this.$refs.guage1.pain();
                        }


                        if(this.noteMap.get(this.list[i].stateId)=="良品率"){
                          this.gaugeVal.val2=parseInt(this.list[i].value);
                          this.$refs.guage2.pain();
                        }



                        if(this.noteMap.get(this.list[i].stateId)=="开动率"){
                          this.gaugeVal.val3=parseInt(this.list[i].value);
                          this.$refs.guage3.pain();
                        }


                    }
                });
                if(this.listLoading)
                  this.listLoading=false
            },1000);
          this.isLoading=false;
            //历史状态
          let par2 =[
            {
              devId:this.devId,
              sId:[],
              sTime:parseInt(new Date().getTime()/1000-7*24*60*60),
              eTime:parseInt(new Date().getTime()/1000),
            }
          ];

          for(let i in this.states.hStates.slice(0,2)){
            par2[0].sId.push(this.states.hStates[i].sId)
          }

          par2 = JSON.stringify(par2);

          fetchHistory(par2).then(res=>{
              for(let i in this.states.hStates.slice(0,2)) {

                for (let x in res.data[0].states) {
                  if (res.data[0].states[x].sId == this.states.hStates.slice(0, 2)[0].sId) {
                    this.hS1Data.note=this.noteMap.get(res.data[0].states[x].sId);
                    this.hS1Data.tData.push(new Date(res.data[0].states[x].time*1000).Format("MM-dd HH:mm"));
                    this.hS1Data.sData.push(res.data[0].states[x].value);

                  } else if (res.data[0].states[x].sId == this.states.hStates.slice(0, 2)[1].sId) {
                    this.hS2Data.note=this.noteMap.get(res.data[0].states[x].sId);
                    this.hS2Data.tData.push(new Date(res.data[0].states[x].time*1000).Format("MM-dd HH:mm"));
                    this.hS2Data.sData.push(res.data[0].states[x].value);
                  }
                }

                this.$refs.line1.pain();
                this.$refs.bar1.pain();


              }
          });



        });


        //获取历史数据


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
