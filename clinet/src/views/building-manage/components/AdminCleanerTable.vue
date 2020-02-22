<template>
  <div class="AdminCleanerTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="UID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="电话号"> </el-table-column>
      <el-table-column label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click="handleDeleteClick(scope.row.id)"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AdminCleanerTable',
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDeleteClick(id) {
      this.$emit('onDelete', id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
