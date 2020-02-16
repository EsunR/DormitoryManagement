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
      <div class="list-wrapper">
        <RecordList
          @change="handleSelectedChange"
          :records="userUpdateRecords"
        ></RecordList>
      </div>
    </div>
  </div>
</template>

<script>
import RecordButton from './component/RecordButton'
import RecordList from './component/RecordList'
import { getUserRecords, addRecord } from '@/api/record'
export default {
  name: 'GetupRecord',
  components: {
    RecordButton,
    RecordList
  },
  data() {
    return {
      btnDisable: true,
      userUpdateRecords: []
    }
  },
  watch: {
    userUpdateRecords(newVal) {
      if (newVal[0].time) {
        this.btnDisable = true
      } else {
        this.btnDisable = false
      }
    }
  },
  methods: {
    handleBtnClick() {
      if (!this.btnDisable) {
        // 点击打卡
        addRecord({ type: 'getup' }).then(() => {
          this.btnDisable = true
          this.fetchUserRecords(7).then(records => {
            this.userUpdateRecords = records
          })
        })
      }
    },
    async fetchUserRecords(days) {
      const res = await getUserRecords({
        type: 'getup',
        userId: this.$store.getters.allUserInfo.id,
        days
      })
      return res.data.records
    },
    handleSelectedChange(value) {
      this.fetchUserRecords(value).then(records => {
        this.userUpdateRecords = records
      })
    }
  },
  mounted() {
    // 获取用户个人早起信息
    this.fetchUserRecords(7).then(records => {
      this.userUpdateRecords = records
    })
  }
}
</script>

<style lang="scss" scoped>
#getup-record {
  padding: 50px 60px 0px;
  .top-wrapper {
    display: flex;
    .btn-wrapper {
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list-wrapper {
      background-color: #fff;
      margin-left: 20px;
      border-radius: 5px;
      width: 100%;
      padding: 20px;
    }
  }
}
</style>
