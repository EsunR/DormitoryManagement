<template>
  <div id="RoomInfo" class="page-wrapper">
    <!-- 宿舍基础信息 -->
    <h1 class="main-title">
      宿舍基础信息
    </h1>
    <div class="wrapper main-card selector-wrapper">
      <GroupSelector :selectorData="selectorData" />
      <el-button
        type="primary"
        round
        @click="handleSearchRoom"
        :disabled="selectorData.roomId === null"
        >检索宿舍</el-button
      >
    </div>
    <div class="wrapper">
      <PanelGroup :roomInfo="roomInfo" />
    </div>
    <!-- 宿舍基础信息 -->

    <!-- 宿舍成员 -->
    <h1 class="main-title">宿舍成员</h1>
    <div class="wrapper main-card">
      <StudentsTable :table-data="students" />
    </div>
    <!-- 宿舍成员 -->
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import PanelGroup from './components/PanelGroup'
import StudentsTable from './components/StudentsTable'

import { getRoomInfo } from '@/api/room'
export default {
  name: 'RoomInfo',
  components: {
    GroupSelector,
    PanelGroup,
    StudentsTable
  },
  data() {
    return {
      roomInfo: {},
      buildingInfo: {},
      floorInfo: {},
      students: [],
      selectorData: {
        buildingId: null,
        floorId: null,
        roomId: null
      }
    }
  },
  watch: {
    '$route.query.roomId': function(newVal) {
      if (newVal && this.$route.name === 'roomInfo') {
        this.fetchRoomInfo(newVal)
      }
    }
  },
  mounted() {
    const roomId = this.$route.query.roomId
    if (roomId) {
      this.fetchRoomInfo(roomId)
    }
  },
  methods: {
    async fetchRoomInfo(roomId) {
      const roomInfo = (await getRoomInfo(roomId)).data
      this.roomInfo = roomInfo
      this.buildingInfo = roomInfo.building
      this.students = roomInfo.users
    },
    handleSearchRoom() {
      this.$router.push({
        name: 'roomInfo',
        query: { roomId: this.selectorData.roomId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#RoomInfo {
  > .wrapper {
    margin: 40px 0;
  }
  .selector-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
