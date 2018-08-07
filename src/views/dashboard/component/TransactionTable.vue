<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <template >
    <el-table-column prop="order_no" label="帐号" min-width="200">

    </el-table-column>
    <el-table-column prop="price" label="在线时长" width="195" align="center">

    </el-table-column>
    <el-table-column  label="在线状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
        </template>
    </el-table-column>
    </template>
  </el-table>
</template>

<script>
//import { fetchList } from '@/api/transaction'

export default {
  data() {
    return {
      list: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        online: 'success',
        offine: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
//      fetchList().then(response => {
//        this.list = response.data.items.slice(0, 8)
//      })
      this.list=[
        {
          order_no:"17606637573",
          price:"3000小时",
          status:"online"
        },
        {
          order_no:"15921011233",
          price:"984小时",
          status:"offine"
        },
        {
        order_no:"1343993748",
        price:"60小时",
        status:"online"
        },

        {
          order_no:"1343993777",
          price:"58小时",
          status:"offine"
        },

        {
          order_no:"13112146746",
          price:"4小时",
          status:"offine"
        }

      ];

    }
  }
}
</script>
