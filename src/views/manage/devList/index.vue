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

          <span>{{scope.row.isSupervisor==1?scope.row.telephone:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC地址"  align="center">
        <template slot-scope="scope">
          {{scope.row.mac}}
        </template>
      </el-table-column>


      <el-table-column label="机床品牌" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.minf}}
        </template>
      </el-table-column>


      <el-table-column align="center" prop="created_at" label="控制器品牌" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.cinf}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" width="140" label="实时状态数量">
        <template slot-scope="scope">
          <span>{{scope.row.rStateCnt}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="历史状态数量" width="140" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.hstatecnt}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="在线状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag type="success">online</el-tag>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" label="操作" align="center"  width="220">
        <template slot-scope="scope">
          <router-link :to="'/manage/devInfo/'+scope.row.id">
            <el-button size="mini" type="primary" >详情</el-button>
          </router-link>

          <!--<el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>-->
        </template>
      </el-table-column>

    </el-table>



    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pno" :page-sizes="[10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchDevList } from '@/api/fetchDevList'
  import waves from '@/directive/waves' // 水波纹指令
  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        dialogFormVisible:false,
        pno:1,
        limit:10,
        total:0,
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


    },
    mounted(){
      this.fetchData()
    },


    methods: {

      handleCurrentChange(val){

        this.pno=val;
        this.fetchData();
      },


      handleSizeChange(val){
        this.limit=val;
        this.fetchData();
      },

      del(key){
        this.list.splice(key,1);
        this.$message({
          message: '操作成功',
          type: 'success'
        });

      },

      fetchData() {
        this.listLoading = true;

        fetchDevList(this.pno,this.limit).then(res=>{
          this.list=res.data.listData;
          this.pno=res.data.pno;
          this.total=res.data.total;
          setTimeout(()=>{this.listLoading = false;},500)
        });

      }
    }
  }
</script>
