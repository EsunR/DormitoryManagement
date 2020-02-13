<template>
  <div class="dashboard-editor-container">
    <!-- Top  -->
    <div class="top clearfix">
      <img class="avatar" :src="avatar" style="float: left" />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;"
          >宿舍概览</span
        >
      </div>
    </div>
    <!-- Top  -->

    <!-- Main -->
    <div class="main">
      main
    </div>
    <!-- Main -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  .top {
    .avatar {
      width: 170px;
      border-radius: 50%;
      box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.1);
    }
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }

  .main {
    background-color: pink;
  }
}
</style>
