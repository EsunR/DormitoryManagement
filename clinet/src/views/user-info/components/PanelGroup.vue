<template>
  <div id="room-panel-group">
    <el-row :gutter="30" v-if="userInfo.id">
      <el-col
        v-for="(item, index) in panelData"
        :key="index"
        :sm="24 / (panelData.length / 2)"
      >
        <div class="group-item-wrapper">
          <div class="icon-wrapper">
            <i :class="item.icon" class="icon" :style="{ color: item.color }" />
          </div>
          <div class="text-wrapper">
            <div class="title">{{ item.title }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-else class="main-card no-data-tips">
      = 请选择用户 =
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomPanelGroup',
  data() {
    return {}
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    panelData() {
      return [
        {
          icon: 'el-icon-s-home',
          color: '#40C9C6',
          title: '房间号',
          content: this.userInfo.roomNumber
        },
        {
          icon: 'el-icon-location',
          color: '#36A3F7',
          title: '所在楼层',
          content: this.userInfo.floorLayer + '层'
        },
        {
          icon: 'el-icon-office-building',
          color: '#F4516C',
          title: '宿舍楼',
          content: this.userInfo.buildingName
        },
        {
          icon: 'el-icon-user-solid',
          color: '#34BFA3',
          title: '入住日期',
          content: this.$moment(this.userInfo.checkTime).format('YYYY-MM-DD')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#room-panel-group {
  margin-bottom: -20px;
  .group-item-wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    cursor: pointer;
    transition: all ease 0.5s;
    padding: 20px 30px;
    border-radius: 5px;
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    border-radius: 5px;
    margin-bottom: 20px;
    &:hover {
      box-shadow: $shadow-main;
      transform: scale(1.1);
    }
    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 50px;
        font-weight: bold;
      }
    }
    .text-wrapper {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content {
        font-size: 26px;
        /* font-weight: bold; */
      }
    }
  }
}
</style>
