<template>
  <div class="statistic-info" v-loading="loading">
    <div class="summary">总入住人数: {{ statisticData.studentCount || 0 }}</div>
    <el-row>
      <el-col :span="8" class="chart-container">
        <VChart :option="sexChartConfig" autoresize />
      </el-col>
      <el-col :span="8" class="chart-container">
        <VChart :option="facultyChartConfig" autoresize />
      </el-col>
      <el-col :span="8" class="chart-container">
        <VChart :option="majorChartConfig" autoresize />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBuildingStatistic } from '@/api/building'
import VChart from 'vue-echarts'

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
  components: {
    VChart
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
    sexChartConfig() {
      return {
        title: {
          text: '性别分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            data: [
              {
                name: '男生',
                value:
                  (this.statisticData.sex &&
                    this.statisticData.sex.boysCount) ||
                  0
              },
              {
                name: '女生',
                value:
                  (this.statisticData.sex &&
                    this.statisticData.sex.girlsCount) ||
                  0
              }
            ]
          }
        ]
      }
    },
    facultyChartConfig() {
      return {
        title: {
          text: '院系分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            data: (this.statisticData.faculty || []).map(item => {
              return {
                name: item.name,
                value: item.count
              }
            })
          }
        ]
      }
    },
    majorChartConfig() {
      return {
        title: {
          text: '专业分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            data: (this.statisticData.major || []).map(item => {
              return {
                name: item.name,
                value: item.count
              }
            })
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  font-size: 20px;
  margin-bottom: 20px;
  background-color: #41ba82;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #ffffff;
}
.chart-container {
  height: 300px;
}
</style>
