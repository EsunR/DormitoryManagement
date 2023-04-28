/**
 * 格式化旧的折线图数据
 * 主要用于格式化 getLineChartData 接口获取的数据
 */
export function convertOldLineChartData(chartData) {
  const columns = chartData.columns || []
  const rows = chartData.rows || []
  const xAxis = {
    type: 'category',
    data: rows.map(row => row[columns[0]]) || []
  }
  const yAxis = {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  }
  const series = columns.slice(1).map(column => ({
    name: column,
    type: 'line',
    data: rows.map(row => parseFloat((Number(row[column]) * 100).toFixed(2)))
  }))
  return {
    legend: {
      data: columns.slice(1)
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis,
    yAxis,
    series
  }
}
