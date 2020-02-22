<template>
  <div class="dashboard-student-container">
    <!-- Top  -->
    <div class="top clearfix" v-if="newUser">
      <img class="avatar" :src="avatar" style="float: left" />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;"
          >用户信息填写</span
        >
      </div>
    </div>
    <!-- Top  -->

    <!-- Main -->
    <div class="dashboard-main-container">
      <guide v-if="newUser"></guide>
      <info v-else></info>
    </div>
    <!-- Main -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Guide from './guide'
import Info from './info'

export default {
  name: 'DashboardStudent',
  components: {
    Guide,
    Info
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'room',
      'floor',
      'building',
      'newUser'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-student-container {
  padding: 50px 60px 0px;
  .top {
    .avatar {
      width: 160px;
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
}
</style>
