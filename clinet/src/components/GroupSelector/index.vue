<template>
  <div class="GroupSelector">
    <!-- 宿舍楼选择 -->
    <div class="selector-item" v-if="selectorData.buildingId !== undefined">
      <span class="label">宿舍楼</span>
      <el-select v-model="groupData.buildingId" placeholder="请选择" clearable>
        <el-option
          v-for="item in buildingsData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 宿舍楼选择 -->

    <!-- 楼层选择 -->
    <div class="selector-item" v-if="selectorData.floorId !== undefined">
      <span class="label">楼层</span>
      <el-select
        v-model="groupData.floorId"
        placeholder="请选择"
        :disabled="!groupData.buildingId"
        clearable
      >
        <el-option
          v-for="item in floorsData"
          :key="item.id"
          :label="item.layer"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 楼层选择 -->

    <!-- 房间选择 -->
    <div class="selector-item" v-if="selectorData.roomId !== undefined">
      <span class="label">房间</span>
      <el-select
        v-model="groupData.roomId"
        placeholder="请选择"
        :disabled="!groupData.floorId"
        clearable
      >
        <el-option
          v-for="item in roomsData"
          :key="item.id"
          :label="item.number"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 房间选择 -->

    <!-- 学生选择 -->
    <div class="selector-item" v-if="selectorData.userId !== undefined">
      <span class="label">学生</span>
      <el-select
        v-model="groupData.userId"
        placeholder="请选择"
        :disabled="!groupData.roomId"
        clearable
      >
        <el-option
          v-for="item in usersData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 学生选择 -->
  </div>
</template>

<script>
import { getManageBuildings } from '@/api/building'
import { getFloors } from '@/api/floor'
import { getRooms } from '@/api/room'
import { getStudents } from '@/api/user'
export default {
  name: 'GroupSelector',
  model: {
    prop: 'selectorData',
    event: 'selected'
  },
  data() {
    return {
      groupData: {
        buildingId: null,
        floorId: null,
        roomId: null,
        userId: null
      },
      buildingsData: [],
      floorsData: [],
      roomsData: [],
      usersData: []
    }
  },
  props: {
    selectorData: {
      type: Object,
      required: true
    }
  },
  watch: {
    'groupData.buildingId': function() {
      this.groupData.floorId = null
      this.groupData.roomId = null
      this.groupData.userId = null
      this.fetchFloorsData()
    },
    'groupData.floorId': function() {
      this.groupData.roomId = null
      this.groupData.userId = null
      this.fetchRoomsData()
    },
    'groupData.roomId': function() {
      this.groupData.userId = null
      this.fetchUsersData()
    },
    groupData: {
      deep: true,
      handler(newVal) {
        for (let key in this.selectorData) {
          this.selectorData[key] = newVal[key]
        }
      }
    }
  },
  mounted() {
    this.fetchBuildingsData()
  },
  methods: {
    async fetchBuildingsData() {
      getManageBuildings().then(res => {
        this.buildingsData = res.data.buildings
      })
    },
    async fetchFloorsData() {
      getFloors({ buildingId: this.groupData.buildingId }).then(res => {
        this.floorsData = res.data.floors
      })
    },
    async fetchRoomsData() {
      getRooms({ floorId: this.groupData.floorId }).then(res => {
        this.roomsData = res.data.rooms
      })
    },
    async fetchUsersData() {
      getStudents({ roomId: this.groupData.roomId }).then(res => {
        this.usersData = res.data.users
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.GroupSelector {
  display: flex;
  margin: 0 -10px;
  .selector-item {
    display: flex;
    align-items: center;
    margin: 0 10px;
    span {
      margin-right: 10px;
    }
  }
}
</style>
