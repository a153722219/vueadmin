<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <template >
    <el-table-column prop="telephone" label="帐号" min-width="200">

    </el-table-column>
    <el-table-column label="在线时长" width="195" align="center">
      <template slot-scope="scope">
       {{scope.row.onlineTime | onlineTime}}
      </template>


    </el-table-column>
    <el-table-column  label="在线状态" width="100" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>-->
          <el-tag :type="'online' | statusFilter"> online </el-tag>
        </template>
    </el-table-column>
    </template>
  </el-table>
</template>

<script>


export default {
  data() {
    return {

    }
  },

  props:{
      list:{
          type:Array,
          default:function () {
            return []
          }
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
    },
    onlineTime(time){
        return parseInt(time/1000/60/60)+"小时"
    }
  },
  created() {
    //this.fetchData()
  },
  methods: {
//    fetchData() {
//      fetchOnlineTime().then(response => {
//        this.list = response.data.activeUsers;
//      })
//    }
  }
}
</script>
