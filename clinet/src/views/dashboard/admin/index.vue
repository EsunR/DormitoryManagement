<template>
  <div class="dashboard-admin-container">
    <!-- 管理概览 -->
    <h1 class="main-title">
      <span style="margin-right: 20px">管理概览</span>
      <el-select v-model="buildingId" placeholder="请选择管理的宿舍">
        <el-option
          v-for="item in manageBuildings"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </h1>
    <div class="wrapper">
      <PanelGroup :building-id="buildingId"></PanelGroup>
    </div>
    <!-- 管理概览 -->

    <h1 class="main-title">最新动态</h1>
    <!-- 最新学生早起情况 -->
    <div class="wrapper">
      <RecordTable
        type="getup"
        title="早起动态"
        icon="el-icon-alarm-clock"
        :table-data="getupTableData"
        :show-pagination="false"
      ></RecordTable>
    </div>
    <div class="wrapper">
      <RecordTable
        type="back"
        title="归宿动态"
        icon="el-icon-s-home"
        :table-data="backTableData"
        :show-pagination="false"
      ></RecordTable>
    </div>
    <div class="wrapper">
      <RecordTable
        type="clean"
        title="打扫动态"
        icon="el-icon-magic-stick"
        :table-data="cleanTableData"
        :show-pagination="false"
      ></RecordTable>
    </div>
    <!-- 最新学生早起情况 -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import RecordTable from '@/components/RecordTable'
import { getRecordTableData } from '@/api/record'
export default {
  name: 'AdminDashboard',
  components: {
    PanelGroup,
    RecordTable
  },
  data() {
    return {
      buildingId: 0,
      getupTableData: [],
      backTableData: [],
      cleanTableData: []
    }
  },
  computed: {
    manageBuildings() {
      const buildings = this.$store.getters.manageBuildings
      return buildings
    }
  },
  watch: {
    manageBuildings() {
      this.buildingId =
        this.manageBuildings.length > 0 ? this.manageBuildings[0].id : 0
    },
    buildingId(val) {
      this.getGetupTableData(val)
      this.getBackTableData(val)
      this.getCleanTableData(val)
    }
  },
  mounted() {
    this.buildingId =
      this.manageBuildings.length > 0 ? this.manageBuildings[0].id : 0
  },
  methods: {
    async getGetupTableData(buildingId) {
      const { rows } = (await getRecordTableData('getup', { buildingId })).data
      this.getupTableData = rows
    },
    async getBackTableData(buildingId) {
      const { rows } = (await getRecordTableData('back', { buildingId })).data
      this.backTableData = rows
    },
    async getCleanTableData(buildingId) {
      const { rows } = (await getRecordTableData('clean', { buildingId })).data
      this.cleanTableData = rows
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  padding: 50px 60px 0px;
  .main-title {
    display: flex;
    align-items: center;
  }
  .wrapper {
    border-radius: 5px;
    overflow: hidden;
    margin: 40px 0;
  }
}
</style>
