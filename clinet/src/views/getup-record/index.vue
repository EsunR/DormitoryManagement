<template>
  <div id="getup-record">
    <div class="top-wrapper">
      <div class="btn-wrapper">
        <RecordButton
          @click="handleBtnClick"
          :disable="btnDisable"
          btn-color="#1890ff"
        ></RecordButton>
      </div>
      <div class="record-wrapper">
        打卡记录
      </div>
    </div>
  </div>
</template>

<script>
import RecordButton from './component/RecordButton'
export default {
  name: 'GetupRecord',
  components: {
    RecordButton
  },
  data() {
    return {
      btnDisable: true
    }
  },
  methods: {
    handleBtnClick() {
      this.btnDisable = !this.btnDisable
    }
  }
}
</script>

<style lang="scss" scoped>
#getup-record {
  padding: 50px 60px 0px;
  .top-wrapper {
    display: flex;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    .record-wrapper {
      margin-left: 40px;
    }
  }
}
</style>
