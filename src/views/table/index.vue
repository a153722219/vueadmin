<template>
  <div class="app-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
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
      <el-table-column align="center" prop="created_at" label="所属公司" width="230">
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


      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" >删除</el-button>
          <el-button size="mini" type="primary">冻结</el-button>
          <el-button size="mini" type="success">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
//import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
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
  methods: {
    fetchData() {
      this.listLoading = true;
//      getList(this.listQuery).then(response => {
//        this.list = response.data.items
//        this.listLoading = false
//      })

      setTimeout( ()=> {
        this.list=[
          {
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"normal",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          },
          {
            username:"17606637573",
            regTime:"2015-1-15",
            isReal:"否",
            status:"normal",
            display_time:"53小时",
            company:"广州亿达科技有限公司",
            Identity:"普通用户"
          },

          {
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
