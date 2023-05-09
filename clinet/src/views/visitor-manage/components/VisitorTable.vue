<template>
  <div class="visitor-table">
    <div class="table-title" v-if="title">
      来访人员记录
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="身份证" prop="idNumber"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex === '0' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column label="到访宿舍楼">
          <template slot-scope="scope">
            {{ scope.row.building.name }}
          </template>
        </el-table-column>
        <el-table-column label="到访日日" prop="createdAt">
          <template slot-scope="scope">
            {{ $moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisitorTable',
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    icon: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  background-color: #fff;
  padding: 20px;
  padding-bottom: 0px;
  font-size: 18px;
  font-weight: bold;
  color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  .icon {
    font-size: 24px;
    margin-right: 10px;
  }
}
.table-wrapper {
  background-color: #fff;
  .bdge-wrapp {
    display: flex;
    justify-content: center;
    .early-bdge {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: $color-danger;
    }
    .early-bdge-green {
      background-color: $color-success;
    }
  }
}
a {
  color: $color-primary;
  &:hover {
    text-decoration: underline;
  }
}
</style>
