<template>
  <div id="admin-manage" class="page-wrapper">
    <!-- 添加管理员 -->
    <h1 class="main-title">添加管理员</h1>
    <div class="wrapper top-wrapper">
      <div class="main-card left">
        <div class="title-wrapper">总数：{{ this.total }}</div>
        <div class="content-wrapper">
          <div class="admin admin-card">
            <i class="el-icon-user"></i>
            普通管理员: {{ adminCount }}
          </div>
          <div class="superAdmin admin-card">
            <i class="el-icon-user"></i>
            超级管理员: {{ superAdminCount }}
          </div>
        </div>
      </div>
      <div class="main-card right">
        <AddAdminForm />
      </div>
    </div>
    <!-- 添加管理员 -->

    <!-- 表格 -->
    <h1 class="main-title">已有管理员列表</h1>
    <div class="wrapper main-card">
      <AdminTable :table-data="adminsTableData" />
    </div>
    <!-- 表格 -->
  </div>
</template>

<script>
import AddAdminForm from './components/AddAdminForm'
import AdminTable from './components/AdminTable'

import { getAdminTableData } from '@/api/user'
export default {
  name: 'adminManage',
  components: {
    AddAdminForm,
    AdminTable
  },
  data() {
    return {
      adminsTableData: [],
      total: 0,
      superAdminCount: 0,
      adminCount: 0
    }
  },
  mounted() {
    this.fetchAdminTableData()
  },
  methods: {
    async fetchAdminTableData() {
      await getAdminTableData().then(res => {
        this.adminsTableData = res.data.admins
        this.total = res.data.total
        this.superAdminCount = res.data.admins.filter(
          item => item.role === 'superAdmin'
        ).length
        this.adminCount = this.total - this.superAdminCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 0;
}
.top-wrapper {
  display: flex;
  > .left {
    margin-right: 20px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title-wrapper {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .admin-card {
      padding: 20px;
      border-radius: 5px;
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      color: #ffffff;
    }
    .admin {
      margin-bottom: 20px;
      background-color: $color-primary;
    }
    .superAdmin {
      background-color: $color-origin;
    }
  }
  > .right {
    width: 100%;
    overflow: visible;
  }
}
</style>
