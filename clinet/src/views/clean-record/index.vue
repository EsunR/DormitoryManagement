<template>
  <div id="clean-record">
    <h1 class="main-title">个人记录</h1>
    <div class="top-wrapper">
      <div class="left-wrapper">
        <RecordButton
          @click="handleBtnClick"
          :disable="btnDisable"
          btn-color="#4527A0"
        ></RecordButton>
      </div>
      <div class="right-wrapper">
        <RecordList
          @change="handleSelectedChange"
          :records="userCleanRecords"
        ></RecordList>
      </div>
    </div>
    <h1 class="main-title">打扫历史记录</h1>
    <div class="botttom-wrapper">
      <Table :table-data="roomCleanRecords"></Table>
    </div>
  </div>
</template>

<script>
import RecordButton from './component/RecordButton'
import RecordList from './component/RecordList'
import Table from './component/Table'
import { getUserRecords, addRecord, getRoomRecords } from '@/api/record'
export default {
  name: 'CleanRecord',
  components: {
    RecordButton,
    RecordList,
    Table
  },
  data() {
    return {
      btnDisable: true,
      userCleanRecords: [],
      roomCleanRecords: [],
      days: 7
    }
  },
  computed: {
    userId() {
      return this.$store.getters.allUserInfo.id
    },
    roomId() {
      return this.$store.getters.allUserInfo.roomId
    }
  },
  watch: {
    roomCleanRecords(newVal) {
      if (
        newVal.length > 0 &&
        this.$moment(newVal[0].createdAt).format('YYYY-MM-DD') ===
          this.$moment().format('YYYY-MM-DD')
      ) {
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
        addRecord({ type: 'clean' }).then(() => {
          this.btnDisable = true
          this.fetchUserRecords(this.days).then(records => {
            this.userCleanRecords = records
          })
          this.fetchRoomRecords(this.days).then(records => {
            this.roomCleanRecords = records
          })
        })
      }
    },
    async fetchUserRecords(days) {
      const res = await getUserRecords({
        type: 'clean',
        userId: this.userId,
        days
      })
      return res.data.records
    },
    async fetchRoomRecords(days) {
      const res = await getRoomRecords({
        type: 'clean',
        roomId: this.roomId,
        days
      })
      return res.data.records
    },
    handleSelectedChange(value) {
      this.days = value
      this.fetchUserRecords(value).then(records => {
        this.userCleanRecords = records
      })
      this.fetchRoomRecords(value).then(records => {
        this.roomCleanRecords = records
      })
    }
  },
  mounted() {
    // 获取用户个人早起信息
    this.fetchUserRecords(this.days).then(records => {
      this.userCleanRecords = records
    })
    // 获取表格数据
    this.fetchRoomRecords(this.days).then(records => {
      this.roomCleanRecords = records
    })
  }
}
</script>

<style lang="scss" scoped>
#clean-record {
  padding: 50px 60px 0px;
  .top-wrapper {
    display: flex;
    margin: 40px 0;
    .left-wrapper {
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right-wrapper {
      background-color: #fff;
      margin-left: 20px;
      border-radius: 5px;
      width: 100%;
      padding: 20px;
    }
  }
  .botttom-wrapper {
    margin: 40px 0;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>
