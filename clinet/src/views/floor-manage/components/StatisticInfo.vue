<template>
  <div class="statistic-info" v-loading="loading">
    <div>入住人数: {{ statisticData.studentCount || 0 }}</div>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import { getBuildingStatistic } from '@/api/building'
export default {
  props: {
    buildingId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      loading: false,
      statisticData: {}
    }
  },
  methods: {
    fetchStatisticData() {
      if (!this.buildingId) {
        return
      }
      this.loading = true
      getBuildingStatistic(this.buildingId)
        .then(res => {
          this.statisticData = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  watch: {
    buildingId: {
      immediate: true,
      handler() {
        this.fetchStatisticData()
      }
    }
  },
  computed: {
    sexCharData() {
      return [
        {
          name: '男生',
          value: this.statisticData.maleCount || 0
        },
        {
          name: '女生',
          value: this.statisticData.femaleCount || 0
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
