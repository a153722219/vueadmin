<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" :placeholder="$t('table.title')">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">{{$t('table.search')}}</el-button>

    </div>


    <el-table :data="list" v-loading="listLoading" style="width: 100%;" element-loading-text="Loading" border fit highlight-current-row>


      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.regTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否实名" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.isReal}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="在线时长" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="所属公司">
        <template slot-scope="scope">
          <span>{{scope.row.company}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="角色信息" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Identity}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="帐号状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" label="操作" align="center"  width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
          <el-button size="mini" @click="modifyStatus(scope.$index,scope.row.status)" :type="scope.row.status=='normal'?'primary':'danger'">{{scope.row.status=='normal'?"冻结":"解冻"}}</el-button>
          <el-button size="mini" @click="showModifyDialog(scope.row)" type="success">修改</el-button>
        </template>
      </el-table-column>

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
    }
  },
  created() {
    this.fetchData()

  },
  mounted(){

  },
  methods: {

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
      this.listLoading = true;
//      getList(this.listQuery).then(response => {
//        this.list = response.data.items
//        this.listLoading = false
//      })

      setTimeout( ()=> {
        this.list=[
          {
            id:0,
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"normal",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          },
          {
            id:1,
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"normal",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          },

          {
            id:2,
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"disable",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          }
          ,

          {
            id:3,
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"disable",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          }
          ,

          {
            id:4,
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"disable",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          }

        ];
        this.listLoading = false
      },2000);
    }
  }
}
</script>
