<template>
  <div class="record-table">
    <div class="table-title" v-if="title">
      <i v-if="icon" class="icon" :class="icon"></i> {{ title }}
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <a @click="gotoStudentInfo(scope.row.userId)">{{
              scope.row.name
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="学号"> </el-table-column>
        <el-table-column prop="buildingName" label="宿舍楼"> </el-table-column>
        <el-table-column prop="floorLayer" label="楼层"> </el-table-column>
        <el-table-column prop="roomNumber" label="宿舍号">
          <template slot-scope="scope">
            <a @click="gotoRoomInfo(scope.row.roomId)">{{
              scope.row.roomNumber
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="time" label="时间"> </el-table-column>
        <el-table-column
          align="center"
          :label="earlyDesc"
          width="100px"
          v-if="type !== 'clean'"
        >
          <template slot-scope="scope">
            <div class="bdge-wrapp">
              <div
                class="early-bdge"
                :class="{ 'early-bdge-green': scope.row.early }"
              ></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordTable',
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: () => [
        {
          id: 0,
          account: '测试',
          role: 'student',
          name: '测试',
          phone: '123456789011',
          checkTime: '2020-02-15T14:34:55.000Z',
          createdAt: '2020-02-19T14:12:22.000Z',
          updatedAt: '2020-02-19T22:12:54.000Z',
          roomId: 1,
          roomNumber: 101,
          floorId: 1,
          floorLayer: 1,
          buildingId: 1,
          buildingName: '通天苑',
          getupProb: '0.0000',
          backProb: '0.1667',
          cleanProb: '0.1667',
          deletedAt: null,
          userId: 4,
          time: '22:12',
          date: '2020-02-19',
          early: null
        }
      ]
    },
    title: {
      type: String
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  computed: {
    earlyDesc() {
      switch (this.type) {
        case 'getup':
          return '是否早起'
        case 'back':
          return '是否早归'
        default:
          return '记录值'
      }
    }
  },
  methods: {
    gotoStudentInfo(userId) {
      this.$router.push({ name: 'userInfo', query: { userId } })
    },
    gotoRoomInfo(roomId) {
      this.$router.push({ name: 'roomInfo', query: { roomId } })
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
  padding: 20px;
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
