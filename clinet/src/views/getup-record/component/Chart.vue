<template>
  <div class="chart">
    <ve-line :data="charData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      xAxisName: ['周期'],
      yAxisName: ['早起概率'],
      yAxisType: ['percent'],
      area: true
    }
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
  }
}
</script>

<style lang="scss" scoped></style>
