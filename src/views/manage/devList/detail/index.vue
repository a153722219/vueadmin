<template>
    <div id="detail">
      <el-row :gutter="20">
        <el-col :md="12" :sm="24">
          <div class="grid-content bg-purple">

            <el-row :gutter="30">
              <el-col :sm="12" :md="12" :lg="10"  :xs="24">
                <div class="grid-content bg-purple">
                  <img class="dev_img" :src="img_dev" alt="">
                </div>
              </el-col>


              <el-col :sm="12" :md="12" :lg="14" :xs="24">
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
                  </ul>
                </div>
              </el-col>

            </el-row>

          </div>
        </el-col>
        <el-col :md="12" :sm="24"><div class="grid-content bg-purple"></div></el-col>

      </el-row>


    </div>
</template>

<script>
  import img_dev from '@/assets/detail_images/zcj.png'
    export default {
        name: 'detail',

        data(){
            return {
              img_dev
                //id:this.$route.params.id
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #detail{
      padding: 35px 40px;
      width: 100%;
      height: 100%;

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
          margin-bottom: 15px;

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
