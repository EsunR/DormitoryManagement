<template>
  <div class="room-evaluation">
    <el-row :gutter="30">
      <el-col v-for="evaluate in evaluatesData" :md="8" :key="evaluate.id">
        <div class="evaluate-item">
          <div class="top" :style="{ background: getColor(evaluate.score) }">
            <div class="score">
              评价分数：<span>{{ evaluate.score }}</span>
            </div>
            <div class="level">{{ getLevel(evaluate.score) }}</div>
          </div>
          <div class="center">
            <div class="note">评价：{{ evaluate.note }}</div>
          </div>
          <div class="bottom">
            <div class="creator">评价人: {{ evaluate.userName }}</div>
            <div class="time">
              {{ evaluate.createdAt | formatDate('YYYY年MM月DD日 HH:MM') }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    evaluatesData: {
      type: Array,
      required: true
    }
  },
  methods: {
    getLevel(score) {
      if (score >= 80) {
        return '优秀'
      } else if (score >= 60) {
        return '良好'
      } else {
        return '差劲'
      }
    },
    getColor(score) {
      if (score >= 80) {
        return '#1890ff'
      } else if (score >= 60) {
        return '#FFBA00'
      } else {
        return '#ff4949'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluate-item {
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 5px;
  overflow: hidden;
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 20px;
    color: #fff;
    font-weight: bold;
  }
  .center {
    min-height: 100px;
    padding: 0 20px;
    padding-top: 20px;
    box-sizing: content-box;
  }
  .bottom {
    padding: 20px;
    text-align: right;
    color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: space-between;
  }
}
</style>
