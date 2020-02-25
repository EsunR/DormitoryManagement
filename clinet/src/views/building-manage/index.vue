<template>
  <div id="building-manage" class="page-wrapper">
    <!-- 顶部表单 -->
    <h1 class="main-title">创建宿舍楼</h1>
    <div class="wrapper">
      <BuildingAddForm @submitSuccess="fetchBuildings"></BuildingAddForm>
    </div>
    <!-- 顶部表单 -->

    <!-- 宿舍卡片 -->
    <h1 class="main-title">宿舍楼一览</h1>
    <div class="wrapper">
      <el-row :gutter="30">
        <el-col
          v-for="(building, index) in buildings"
          :key="building.id"
          :sm="8"
        >
          <div class="room-card main-card">
            <div class="title">NO.{{ index + 1 }} {{ building.name }}</div>
            <div class="building-info">
              楼层数：<span>{{ building.floorCount }}</span>
            </div>
            <div class="building-info">
              房间数：<span>{{ building.roomCount }}</span>
            </div>
            <div class="building-info">
              学生数：<span>{{ building.studentCount }}</span>
            </div>
            <div class="btn-wrapper">
              <el-tooltip
                effect="dark"
                content="添加管理员"
                placement="bottom-end"
              >
                <el-button
                  type="warning"
                  icon="el-icon-s-custom"
                  circle
                  @click="handleAddAdminBtnClick(building)"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="添加保洁人员" placement="top">
                <el-button
                  type="info"
                  icon="el-icon-brush"
                  circle
                  @click="handleAddCleanerBtnClick(building)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="删除宿舍楼"
                placement="bottom-start"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(building)"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 宿舍卡片 -->

    <!-- 添加管理人员提示框 -->
    <el-dialog
      title="管理员信息"
      :visible.sync="adminDialogVisible"
      width="800px"
      class="admin-dialog"
      :before-close="cleanSelected"
    >
      <div class="dialog-body">
        <h3>已有管理员</h3>
        <AdminCleanerTable :table-data="admins" @onDelete="handleDeleteAdmin" />
        <h3>添加管理员</h3>
        <div class="search-wrapper">
          <AdminSearcher v-model="selectedAdminAccount" />
          <el-button type="primary" @click="handleAddAdmin">添 加</el-button>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="cleanSelected">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 添加管理人员提示框 -->

    <!-- 添加保洁人员提示框 -->
    <el-dialog
      title="保洁人员信息"
      :visible.sync="cleanerDialogVisible"
      width="800px"
      class="cleaner-dialog"
      :before-close="cleanSelected"
    >
      <div class="dialog-body">
        <h3>已有保洁员</h3>
        <AdminCleanerTable
          :table-data="cleaners"
          @onDelete="handleDeleteCleaner"
        />
        <h3>添加保洁员</h3>
        <el-form ref="cleanerForm" :inline="true" :model="cleanerForm">
          <el-form-item label="姓名" required prop="name">
            <el-input
              v-model="cleanerForm.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" required prop="phone">
            <el-input
              v-model="cleanerForm.phone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddCleaner"
              >添 加</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="cleanSelected">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 添加保洁人员提示框 -->
  </div>
</template>

<script>
import BuildingAddForm from './components/BuildingAddForm'
import AdminCleanerTable from './components/AdminCleanerTable'
import AdminSearcher from './components/AdminSearcher'
import { addCleaner, delCleaner } from '@/api/cleaner'
import {
  getBuildings,
  delBuilding,
  getAdminTableData,
  getCleanerTableData,
  addAdminToBuilding,
  removeBuildingAdmin
} from '@/api/building'
export default {
  name: 'buildingManage',
  components: {
    BuildingAddForm,
    AdminCleanerTable,
    AdminSearcher
  },
  data() {
    return {
      buildings: [],
      selected: null,
      adminDialogVisible: false,
      cleanerDialogVisible: false,
      admins: [],
      cleaners: [],
      selectedAdminAccount: '',
      cleanerForm: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    fetchBuildings() {
      getBuildings().then(res => {
        this.buildings = res.data.buildings
      })
    },
    fetchAdminTableData() {
      if (this.selected) {
        const buildingId = this.selected.id
        getAdminTableData(buildingId).then(res => {
          this.admins = res.data.admins
        })
      } else {
        this.$message('没有选中任何宿舍')
      }
    },
    fetchCleanerTableData() {
      if (this.selected) {
        const buildingId = this.selected.id
        getCleanerTableData(buildingId).then(res => {
          this.cleaners = res.data.cleaners
        })
      } else {
        this.$message('没有选中任何宿舍')
      }
    },
    handleAddAdminBtnClick(building) {
      this.selected = building
      this.adminDialogVisible = true
      this.fetchAdminTableData()
    },
    handleAddCleanerBtnClick(building) {
      this.selected = building
      this.cleanerDialogVisible = true
      this.fetchCleanerTableData()
    },
    handleDelete(building) {
      this.selected = building
      this.$confirm(`确认要删除 “${this.selected.name}” 宿舍吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBuilding(this.selected.id).then(res => {
          console.log(res)
          this.fetchBuildings()
          this.$message({ type: 'success', message: '删除成功！' })
        })
      })
    },
    cleanSelected() {
      this.selectedAdminAccount = ''
      this.admins = []
      this.cleaners = []
      this.adminDialogVisible = false
      this.cleanerDialogVisible = false
      this.cleanerForm.name = ''
      this.cleanerForm.phone = ''
    },
    handleAddAdmin() {
      const adminAccount = this.selectedAdminAccount
      if (!adminAccount) {
        return
      }
      const buildingId = this.selected.id
      addAdminToBuilding(adminAccount, buildingId).then(() => {
        this.$message({ type: 'success', message: '添加成功' })
        this.fetchAdminTableData()
      })
    },
    handleAddCleaner() {
      this.$refs.cleanerForm.validate(valid => {
        if (valid) {
          addCleaner({
            name: this.cleanerForm.name,
            phone: this.cleanerForm.phone,
            buildingId: this.selected.id
          }).then(() => {
            this.$message.success('添加成功')
            this.fetchCleanerTableData()
            this.cleanerForm.name = ''
            this.cleanerForm.phone = ''
          })
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    },
    handleDeleteAdmin(id) {
      removeBuildingAdmin(id, this.selected.id).then(res => {
        if (res.data.effectRow > 0) {
          this.$message({ type: 'success', message: '移除成功' })
          this.fetchAdminTableData()
        } else {
          this.$message({ type: 'error', message: '移除失败' })
        }
      })
    },
    handleDeleteCleaner(id) {
      delCleaner(id).then(() => {
        this.$message.success('删除成功!')
        this.fetchCleanerTableData()
      })
    }
  },
  mounted() {
    this.fetchBuildings()
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 0;
}
.room-card {
  overflow: visible;
  margin-bottom: 30px;
  position: relative;
  .title {
    margin: -20px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: $color-primary;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 5px 5px 0 0;
  }
  .building-info {
    margin: 10px 0;
    span {
      font-weight: bold;
    }
  }
  .btn-wrapper {
    position: absolute;
    right: 20px;
    top: 40px;
    .el-button {
      box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
    }
  }
}

.admin-dialog {
  .search-wrapper {
    display: flex;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
