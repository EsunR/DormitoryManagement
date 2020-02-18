<template>
  <div class="record-list">
    <div class="info-wrapper">
      <div class="top-text">早归概率</div>
      <div class="counter">
        <countTo
          :startVal="0"
          :endVal="percent"
          :decimals="2"
          :duration="1500"
          suffix="%"
          class="count"
        ></countTo>
      </div>
      <el-select
        @change="handleSelectedChange"
        v-model="showDays"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-row :gutter="20" class="list-wrapper">
      <el-col :md="12" v-for="record in records" :key="record.id">
        <div class="record-item" :class="{ [getCss(record.time)]: true }">
          <div class="date">
            {{ record.date }}
            {{ record.time }}
          </div>
          <div class="text">
            {{ getText(record.time) }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
const earlyPoint = 22
export default {
  name: 'RecordList',
  components: {
    countTo
  },
  props: {
    records: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: [
        {
          value: 7,
          label: '最近7天'
        },
        {
          value: 14,
          label: '最近14天'
        },
        {
          value: 30,
          label: '最近30天'
        },
        {
          value: 50,
          label: '最近50天'
        },
        {
          value: 100,
          label: '最近100天'
        }
      ],
      showDays: 7
    }
  },
  computed: {
    percent() {
      let total = this.records.length
      let earlyCount = 0
      this.records.forEach(record => {
        let time = parseInt(record.time)
        if (time < earlyPoint) {
          earlyCount++
        }
      })
      const percentNumber = ((earlyCount / total) * 100).toFixed(2)
      return Number(percentNumber)
    }
  },
  methods: {
    getText(time) {
      time = parseInt(time)
      if (isNaN(time)) {
        return '无记录'
      }
      if (time < earlyPoint) {
        return '早归'
      } else {
        return '晚归'
      }
    },
    getCss(time) {
      time = parseInt(time)
      if (isNaN(time)) {
        return 'no-data'
      }
      if (time < earlyPoint) {
        return 'early'
      } else {
        return 'late'
      }
    },
    handleSelectedChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-list {
  height: 240px;
  padding-right: 10px;
  display: flex;
  .info-wrapper {
    margin-right: 20px;
    width: 240px;
    box-sizing: content-box;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .top-text {
      font-size: 18px;
    }
    .count {
      color: #f6416c;
      font-size: 40px;
    }
  }
  .list-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    margin-right: -20px;
    .record-item {
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
    }
    .early {
      background-color: $color-primary;
      color: #fff;
    }
    .late {
      background-color: $color-danger;
      color: #fff;
    }
    .no-data {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>
