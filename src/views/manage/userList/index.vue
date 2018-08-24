<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input ref="searchkey" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')">
      </el-input>

      <el-button class="filter-item" @click="search" type="primary" v-waves icon="el-icon-search">{{$t('table.search')}}</el-button>

    </div>


    <el-table :data="list" v-loading="listLoading" style="width: 100%;" element-loading-text="Loading" border fit highlight-current-row>


      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.telephone}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.regTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否实名" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.is_realname_valified==0?"否":"是"}}
        </template>
      </el-table-column>


      <el-table-column label="设备数量" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.devCount}}
        </template>
      </el-table-column>


      <el-table-column align="center" prop="created_at" label="在线时长" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.onlineTime | onlineTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="所属公司">
        <template slot-scope="scope">
          <span>{{scope.row.comName}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="角色信息" width="150" align="center">
        <template slot-scope="scope">
          <span>普通用户</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="帐号状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.is_delete==0?"normal":"disable"}}</el-tag>
        </template>
      </el-table-column>


      <!--<el-table-column class-name="status-col" label="操作" align="center"  width="300">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button size="mini" @click="modifyStatus(scope.$index,scope.row.status)" :type="scope.row.status=='normal'?'primary':'danger'">{{scope.row.status=='normal'?"冻结":"解冻"}}</el-button>&ndash;&gt;-->
          <!--<el-button size="mini" @click="showModifyDialog(scope.row)" type="success">修改</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->

    </el-table>


    <el-dialog title="编辑" @close="closeDialog" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="temp.password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="modifyRow">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>



    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pno" :page-sizes="[10,20,50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>



  </div>
</template>

<script>
//import { getList } from '@/api/table'
import waves from '@/directive/waves' // 水波纹指令
import fetchUserList from '@/api/fetchUserList' // 水波纹指令

export default {
  data() {
    return {
      list: null,
      pno:1,
      limit:10,
      total:0,
      key:"",
      listLoading: true,
      dialogFormVisible:false,
      rules: {
        //type: [{ required: true, message: 'type is required', trigger: 'change' }],
        //timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        //title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        password:[{ required: true, message: 'password is required', trigger: 'change' }]
      },
      temp: {
        id:undefined,
        password:""
      },
    }
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: 'success',
        disable: 'danger'
      }
      return statusMap[status]
    },

    parseTime(time) {
      if (arguments.length === 0) {
        return null
      }
      const format = '{y}-{m}-{d} {h}:{i}:{s}'
      let date = new Date(parseInt(time))
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    },
    onlineTime(time){
      return parseInt(time/1000/60/60)+"小时"
    }
  },
  created() {
    this.fetchData(1,10)

  },
  mounted(){

  },




  methods: {

    handleCurrentChange(val){

        this.pno=val;
        this.fetchData();
    },

    search(){
        this.key=this.$refs.searchkey.$el.children[0].value;
        this.fetchData();
    },

    handleSizeChange(val){
        this.limit=val;
        this.fetchData();
    },

    closeDialog(){

        this.$refs['dataForm'].clearValidate();
    },

     del(key){
       this.list.splice(key,1);
       this.$message({
         message: '操作成功',
         type: 'success'
       });

     },

    showModifyDialog(row){
         this.temp=Object.assign({},row);
         this.dialogFormVisible = true;
    },

    modifyRow(){

    },

    modifyStatus(key,rowStatus){
        if(rowStatus=="normal"){
            this.list[key].status="disable"
        }else this.list[key].status="normal"

      this.$notify({
        title: '操作成功',
        message: '操作成功',
        type: 'success'
      });

    },


    fetchData() {
      //this.listLoading = true;
//      getList(this.listQuery).then(response => {
//        this.list = response.data.items
//        this.listLoading = false
//      })
      this.listLoading = true;
      fetchUserList(this.pno,this.limit,this.key).then(res=>{
          this.list=res.data.listData;
          this.pno=res.data.pno;
          this.total=res.data.total;
          setTimeout(()=>{this.listLoading = false;},500)
      });


    }
  }
}
</script>
