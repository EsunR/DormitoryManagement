import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

// 部分引入 Echarts：https://github.com/apache/echarts/blob/master/src/echarts.all.ts
export function initEcharts() {
  use([
    // render
    CanvasRenderer,
    // chart
    LineChart,
    BarChart,
    PieChart,
    // component
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent
  ])
}
