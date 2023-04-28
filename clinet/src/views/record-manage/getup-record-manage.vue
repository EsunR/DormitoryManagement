<template>
  <div id="GetupRecordManage" class="page-wrapper">
    <!-- 记录筛选器 -->
    <RecordSelector @onSubmit="handleSearch" />
    <!-- 记录筛选器 -->

    <!-- 记录详情 -->
    <h1 class="main-title">记录详情</h1>
    <div class="main-card wrapper">
      <RecordTable
        :tableData="tableData"
        :tableLoading="tableLoading"
        type="getup"
      />
      <Pagination
        :total="count"
        :page="current"
        @pagination="handlePagination"
        :hidden="tableData.length === 0"
      />
    </div>
    <!-- 记录详情 -->
  </div>
</template>

<script>
import RecordSelector from './components/RecordSelector'
import RecordTable from '@/components/RecordTable'
import Pagination from '@/components/Pagination'

import { getRecordTableData } from '@/api/record'
import { deepClone } from '@/utils'
export default {
  name: 'getupRecordManage',
  components: {
    RecordSelector,
    RecordTable,
    Pagination
  },
  data() {
    return {
      searchOption: {},
      current: 1,
      count: 0,
      step: 10,
      tableData: [],
      tableLoading: false
    }
  },
  methods: {
    handleSearch(data) {
      this.current = 1
      this.searchOption = data
      this.fetchTableData()
    },
    fetchTableData() {
      const params = deepClone(this.searchOption)
      params.current = this.current
      params.step = this.step
      this.tableLoading = true
      getRecordTableData('getup', params)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 0;
}
</style>
