<template>
  <div class="FloorInfoCard main-card">
    <div class="title">
      <span>楼层：{{ floorInfo.layer }}层</span>
      <span>|</span>
      <span>已入住: {{ totalStudentCount }}</span>
      <span>剩余床位: {{ leftBedCount }}</span>
    </div>
    <div class="info">
      <div class="left">
        <router-link
          class="room-itme"
          :class="{
            empty: room.studentCount === 0,
            full: room.studentCount >= room.peopleNum
          }"
          v-for="room in floorInfo.rooms"
          :key="room.id"
          tag="div"
          :to="{ name: 'roomInfo', query: { roomId: room.id } }"
        >
          {{ room.number }}
        </router-link>
      </div>
      <div class="right">
        <div class="cleaner" @click="dialogVisible = true">
          <div class="title">保洁人员</div>
          <div class="cleaner-name">
            {{ floorInfo.cleaner ? floorInfo.cleaner.name : '无' }}
          </div>
        </div>
      </div>
    </div>

    <!-- el-dialog -->
    <el-dialog title="分配保洁人员" :visible.sync="dialogVisible" width="400px">
      <div class="dialog-body">
        <el-select v-model="cleanerId" placeholder="请选择" :clearable="true">
          <el-option
            v-for="item in cleanersData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- el-dialog -->
  </div>
</template>

<script>
import { addCleanerToFloor } from '@/api/floor'
export default {
  name: 'FloorInfoCard',
  data() {
    return {
      dialogVisible: false,
      cleanerId: null
    }
  },
  props: {
    floorInfo: {
      type: Object,
      default: () => ({
        id: null,
        layer: null,
        buildingId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        cleanerId: null,
        cleaner: null,
        rooms: []
      })
    },
    cleanersData: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.cleanerId = this.floorInfo.cleaner ? this.floorInfo.cleaner.id : null
  },
  methods: {
    handleSubmit() {
      const currentId = this.floorInfo.cleaner
        ? this.floorInfo.cleaner.id
        : null
      if (this.cleanerId !== currentId) {
        addCleanerToFloor(this.floorInfo.id, this.cleanerId).then(() => {
          this.$message.success('修改保洁人员成功')
          this.$parent.fetchFloorData()
        })
      }
      this.dialogVisible = false
    }
  },
  computed: {
    totalPeopleNum() {
      return this.floorInfo.rooms.reduce((total, room) => {
        return total + room.peopleNum
      }, 0)
    },
    totalStudentCount() {
      return this.floorInfo.rooms.reduce((total, room) => {
        return total + room.studentCount
      }, 0)
    },
    leftBedCount() {
      return this.totalPeopleNum - this.totalStudentCount
    }
  }
}
</script>

<style lang="scss" scoped>
.FloorInfoCard {
  margin-bottom: 20px;
  > .title {
    border-bottom: 2px solid rgba($color: #000000, $alpha: 0.1);
    padding: 20px;
    margin: -20px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .info {
    display: flex;
    align-items: flex-start;
    .left {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      .room-itme {
        width: 80px;
        margin: 10px;
        background-color: $color-primary;
        color: #ffffff;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: all ease 0.5s;
        border: 1px solid rgba($color: #000000, $alpha: 0.12);
        line-height: 40px;
        height: 40px;
        &:hover {
          transform: scale(1.1);
          box-shadow: $shadow-main;
        }
      }
      .room-itme.empty {
        background-color: rgba($color: #000000, $alpha: 0.1);
        color: rgba($color: #000000, $alpha: 0.8);
      }
      .room-itme.full {
        background-color: $color-danger;
        color: #ffffff;
      }
    }
    .right {
      .cleaner {
        width: 170px;
        height: 170px;
        border: 1px solid rgba($color: #000000, $alpha: 0.2);
        padding: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        transition: all ease 0.2s;
        .title {
          margin-bottom: 20px;
          margin-top: -20px;
        }
        .cleaner-name {
          font-size: 22px;
          font-weight: bold;
        }
        &:hover {
          background-color: $color-primary;
          color: #ffffff;
        }
      }
    }
  }
  .dialog-body {
    .el-select {
      width: 100%;
    }
  }
}
</style>
