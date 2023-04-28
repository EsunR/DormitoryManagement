<template>
  <div class="chart">
    <v-chart :option="chartOption" autoresize></v-chart>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import { convertOldLineChartData } from '@/utils/chart'

export default {
  components: {
    VChart
  },
  data() {
    return {}
  },
  props: {
    charData: {
      type: Object,
      default: () => ({
        columns: [],
        rows: []
      })
    }
  },
  computed: {
    chartOption() {
      const result = convertOldLineChartData(this.charData)
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>
