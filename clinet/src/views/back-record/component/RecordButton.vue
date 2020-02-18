<template>
  <div
    @click="handleClick"
    class="record-button"
    :class="{ 'record-button-disable': disable }"
    :style="{ background: btnColor }"
  >
    <div class="text">
      <span v-if="disable">今日已打卡</span>
      <span v-else>归宿打卡</span>
    </div>
    <div class="date">{{ getDate() }}</div>
  </div>
</template>

<script>
export default {
  name: 'RecordButton',
  data() {
    return {}
  },
  props: {
    btnColor: {
      type: String
    },
    disable: {
      type: Boolean
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    getDate() {
      return this.$moment().format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.record-button {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: #ffffff;
  cursor: pointer;
  transition: all ease 0.2s;
  flex-direction: column;
  &:hover {
    box-shadow: $shadow-main;
    transform: scale(1.05);
  }
  .date {
    font-size: 16px;
    margin-top: 20px;
  }
}
.record-button-disable {
  background-color: rgba($color: #000000, $alpha: 0.5) !important;
  &:hover {
    box-shadow: $shadow-main;
    transform: scale(1);
    cursor: not-allowed;
  }
}
</style>
