<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="姓名"> </el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="time" label="时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
