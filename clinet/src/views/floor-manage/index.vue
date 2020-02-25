<template>
  <div id="FloorManage" class="page-wrapper">
    <h1 class="main-title">楼层管理</h1>
    <div class="selector-wrapper main-card wrapper">
      <GroupSelector v-model="selectorData" />
      <el-button
        type="primary"
        round
        :disabled="selectorData.buildingId === null"
        @click="handleSubmitClick"
        >获取数据</el-button
      >
    </div>
    <h1 class="main-title">楼层信息</h1>
    <div class="list-wrapper">
      <div class="main-card" v-if="floorsData.length === 0">
        请选择宿舍楼
      </div>
      <FloorInfoCard
        v-for="floor in floorsData"
        :key="floor.id"
        :floor-info="floor"
        :cleaners-data="cleanersData"
      />
    </div>
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import FloorInfoCard from './components/FloorInfoCard'
import { getCleanerTableData } from '@/api/building'

import { getFloorsDetail } from '@/api/floor'
export default {
  name: 'floorManage',
  components: {
    GroupSelector,
    FloorInfoCard
  },
  data() {
    return {
      selectorData: {
        buildingId: null
      },
      floorsData: [],
      cleanersData: []
    }
  },
  methods: {
    fetchFloorData() {
      getFloorsDetail(this.selectorData.buildingId).then(res => {
        this.floorsData = res.data.floors
      })
    },
    fetchCleanersData() {
      getCleanerTableData(this.selectorData.buildingId).then(res => {
        this.cleanersData = res.data.cleaners
      })
    },
    handleSubmitClick() {
      this.fetchFloorData()
      this.fetchCleanersData()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 0;
}

.selector-wrapper {
  display: flex;
  justify-content: space-between;
}

.list-wrapper {
  margin-top: 40px;
}
</style>
