<template>
  <div class="StudentTable">
    <el-table :data="tableData" style="width: 100%" :stripe="true">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <a @click="gotoUserDetail(scope.row.id)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="学号"></el-table-column>
      <el-table-column prop="phone" label="电话号"></el-table-column>
      <el-table-column label="入住时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.checkTime | formatDate('YYYY-MM-DD')
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StudentTable',
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    gotoUserDetail(id) {
      this.$router.push({ name: 'userInfo', query: { userId: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: $color-primary;
}
</style>
