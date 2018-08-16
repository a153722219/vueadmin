<template>
  <div class="app-container">
    <div class="filter-container">

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.mt_brand" :placeholder="$t('devices.searchMT')">
        <el-option v-for="item in  mt_map" :key="item.key" :label="item.desc+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>


      <el-input style="width: 200px;" class="filter-item" :placeholder="$t('devices.searchTitle')">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">{{$t('table.search')}}</el-button>

    </div>


    <el-table :data="list" v-loading="listLoading" style="width: 100%;" element-loading-text="Loading" border fit highlight-current-row>


      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备名字" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.devName}}
        </template>
      </el-table-column>
      <el-table-column label="监管人" width="200" align="center">
        <template slot-scope="scope">

          <span>{{scope.row.watcher}}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC地址"  align="center">
        <template slot-scope="scope">
          {{scope.row.MAC}}
        </template>
      </el-table-column>


      <el-table-column label="机床品牌" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.MT_brand}}
        </template>
      </el-table-column>


      <el-table-column align="center" prop="created_at" label="控制器品牌" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.Controller_brand}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" width="140" label="实时状态数量">
        <template slot-scope="scope">
          <span>{{scope.row.rCnt}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="历史状态数量" width="140" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.hCnt}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="在线状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" label="操作" align="center"  width="220">
        <template slot-scope="scope">
          <router-link :to="'/manage/devInfo/'+scope.$index">
            <el-button size="mini" type="primary" >详情</el-button>
          </router-link>

          <!--<el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>-->
        </template>
      </el-table-column>

    </el-table>



    <div class="pagination-container">
      <el-pagination background  layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  //import { getList } from '@/api/table'
  import waves from '@/directive/waves' // 水波纹指令
  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        dialogFormVisible:false,
        listQuery:{
            mt_brand:""
        },
        mt_map:[
          {
              key:0,
              desc:"品牌1"
          },
          {
            key:1,
            desc:"品牌2"
          }
        ]

      }
    },
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          online: 'success',
          offline: 'danger'
        };
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()

    },
    mounted(){

    },
    methods: {

      del(key){
        this.list.splice(key,1);
        this.$message({
          message: '操作成功',
          type: 'success'
        });

      },




      fetchData() {
        this.listLoading = true;
//      getList(this.listQuery).then(response => {
//        this.list = response.data.items
//        this.listLoading = false
//      })

        setTimeout( ()=> {
          this.list=[
            {
                devId:114,
                devName:"A6-ZJX",
                watcher:"17606637573",
                MAC:"000000000000",
                MT_brand:"测试品牌",
                Controller_brand:"测试品牌",
                rCnt:11,
                hCnt:2,
                status:"online"
            },
            {
              devId:114,
              devName:"A6-ZJX",
              watcher:"17606637573",
              MAC:"000000000000",
              MT_brand:"测试品牌",
              Controller_brand:"测试品牌",
              rCnt:11,
              hCnt:2,
              status:"online"
            },
            {
              devId:114,
              devName:"A6-ZJX",
              watcher:"17606637573",
              MAC:"000000000000",
              MT_brand:"测试品牌",
              Controller_brand:"测试品牌",
              rCnt:11,
              hCnt:2,
              status:"online"
            },
            {
              devId:114,
              devName:"A6-ZJX",
              watcher:"17606637573",
              MAC:"000000000000",
              MT_brand:"测试品牌",
              Controller_brand:"测试品牌",
              rCnt:11,
              hCnt:2,
              status:"online"
            }

          ];
          this.listLoading = false
        },2000);
      }
    }
  }
</script>
