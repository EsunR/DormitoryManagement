<template>
  <div id="RoomInfo" class="page-wrapper">
    <!-- 宿舍基础信息 -->
    <h1 class="main-title">
      <span class="mr-gap">宿舍基础信息</span>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        v-if="roomInfo.id"
        @click="editModalVisible = true"
      ></el-button>
      <room-info-edit-modal
        :visible.sync="editModalVisible"
        :roomInfo="roomInfo"
        @update-success="fetchRoomInfo(roomInfo.id)"
      />
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

    <!-- 宿舍评价 -->
    <h1 class="main-title">宿舍评价</h1>
    <div class="wrapper">
      <div class="main-card form-wrapper">
        <el-form :model="evaluateForm" ref="evaluateForm" label-width="100px">
          <el-form-item label="宿舍评价" prop="note" required>
            <el-input type="textarea" v-model="evaluateForm.note"></el-input>
          </el-form-item>
          <el-form-item label="评分" prop="score" required>
            <el-input-number
              v-model="evaluateForm.score"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleSubmit">发表评分</el-button>
        </div>
      </div>
      <Evaluates
        :evaluatesData="evaluatesData"
        @afterDel="fetchRoomInfo(roomInfo.id)"
      ></Evaluates>
    </div>
    <!-- 宿舍评价 -->
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import PanelGroup from './components/PanelGroup'
import StudentsTable from './components/StudentsTable'
import Evaluates from '../dashboard/student/components/Evaluates'
import RoomInfoEditModal from './components/RoomInfoEditModal.vue'

import { getRoomInfo } from '@/api/room'
import { getEvaluates, addEvaluate } from '@/api/evaluate'
export default {
  name: 'RoomInfo',
  components: {
    GroupSelector,
    PanelGroup,
    StudentsTable,
    Evaluates,
    RoomInfoEditModal
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
      },
      evaluatesData: [],
      evaluateForm: {
        note: '',
        score: 60
      },
      editModalVisible: false
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
      const evaluates = (await getEvaluates({ roomId: roomInfo.id })).data
        .evaluates
      this.evaluatesData = evaluates
    },
    handleSearchRoom() {
      this.$router.push({
        name: 'roomInfo',
        query: { roomId: this.selectorData.roomId }
      })
    },
    handleSubmit() {
      this.$refs.evaluateForm.validate(result => {
        if (result) {
          addEvaluate({
            note: this.evaluateForm.note,
            score: this.evaluateForm.score,
            roomId: this.roomInfo.id
          }).then(() => {
            this.$message.success('发布成功')
            this.fetchRoomInfo(this.roomInfo.id)
          })
        } else {
          this.$message.error('请填充完整信息')
        }
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
  .form-wrapper {
    margin-bottom: 40px;
    .btn-wrapper {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .mr-gap {
    margin-right: 16px;
  }
}
</style>
