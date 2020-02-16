<template>
  <div id="student-panel-group">
    <el-row :gutter="30">
      <el-col v-for="(item, index) in panelData" :key="index" :sm="6">
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
  </div>
</template>

<script>
export default {
  name: 'StudentPanelGroup',
  data() {
    return {}
  },
  computed: {
    panelData() {
      return [
        {
          icon: 'el-icon-s-home',
          color: '#40C9C6',
          title: '房间号',
          content: this.$store.getters.room.number
        },
        {
          icon: 'el-icon-location',
          color: '#36A3F7',
          title: '所在楼层',
          content: this.$store.getters.floor.layer + '层'
        },
        {
          icon: 'el-icon-office-building',
          color: '#F4516C',
          title: '宿舍楼',
          content: this.$store.getters.building.name
        },
        {
          icon: 'el-icon-date',
          color: '#34BFA3',
          title: '入住日期',
          content: this.$moment(
            this.$store.getters.allUserInfo.checkTime
          ).format('YYYY-MM-DD')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#student-panel-group {
  .group-item-wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    cursor: pointer;
    transition: all ease 0.5s;
    padding: 20px 30px;
    border-radius: 5px;
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
