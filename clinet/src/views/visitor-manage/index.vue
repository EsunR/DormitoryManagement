<template>
  <div id="visitor-manage" class="page-wrapper">
    <h1 class="main-title">
      <span>来访人员登记</span>
      <el-button type="primary" @click="onAddBtnClick">新增</el-button>
    </h1>
    <div class="main-card wrapper">
      <VisitorTable
        :tableData="tableData"
        type="back"
        :table-loading="tableLoading"
      />
      <Pagination
        :total="count"
        :page="current"
        @pagination="handlePagination"
        :hidden="tableData.length === 0"
      />
    </div>
    <VisitorCreateModal
      :visible.sync="createModalVisible"
      @create-success="onCreateSuccess"
    />
  </div>
</template>

<script>
import VisitorTable from './components/VisitorTable.vue'
import Pagination from '@/components/Pagination'
import VisitorCreateModal from './components/VisitorCreateModal.vue'
import { getVisitorList } from '@/api/visitor'

export default {
  components: {
    VisitorTable,
    Pagination,
    VisitorCreateModal
  },
  data() {
    return {
      current: 1,
      count: 0,
      step: 10,
      tableData: [],
      tableLoading: false,
      createModalVisible: false
    }
  },
  methods: {
    fetchTableData() {
      const params = {
        current: this.current,
        step: this.step
      }
      this.tableLoading = true
      getVisitorList(params)
        .then(res => {
          this.tableData = res.data.rows
          this.count = res.data.count
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    handlePagination({ page, limit }) {
      this.current = page
      this.step = limit
      this.fetchTableData()
    },
    onAddBtnClick() {
      this.createModalVisible = true
    },
    onCreateSuccess() {
      this.current = 1
      this.fetchTableData()
    }
  },
  mounted() {
    this.fetchTableData()
  }
}
</script>

<style lang="scss" scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper {
  margin: 40px 0;
}
</style>
