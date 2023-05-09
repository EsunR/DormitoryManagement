<template>
  <div class="record-table">
    <div class="table-title" v-if="title">
      <i v-if="icon" class="icon" :class="icon"></i> {{ title }}
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
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
      default: () => []
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
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
