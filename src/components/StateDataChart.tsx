import { useCallback } from 'react'
import Chart from 'react-apexcharts'
import { ChartMetric } from '../types'

export interface StateDataChartProps {
  data: { x: number; y: number }[]
  loading: boolean
  onDateHover: (date: string) => void
  metric: ChartMetric
  height: number
}

export default function StateDataChart({ data, loading, onDateHover, metric, height }: StateDataChartProps) {
  const noDataText = loading ? 'Loading...' : 'Unable to load data :('
  const seriesName = metric === 'cases' ? 'Total cases' : 'Total hospitalizations'

  const tooltipFormatter = useCallback(
    (date: string) => {
      onDateHover(date)
      return ''
    },
    [onDateHover]
  )

  return (
    <Chart
      options={{
        chart: {
          height,
          width: '100%',
          type: 'line',
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        yaxis: [{ title: { text: seriesName } }],
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false,
            formatter: tooltipFormatter,
          },
        },
        noData: {
          text: noDataText,
        },
      }}
      series={[
        {
          name: seriesName,
          data,
        },
      ]}
      type="line"
      height={height}
    />
  )
}
