import Chart from 'react-apexcharts'

export interface StateDataChartProps {
  data: { x: number; y: number }[]
  loading: boolean
  onDateHover: (date: string) => void
  metric: 'cases' | 'hospitalizations' // TODO: add to types
}

export default function StateDataChart({ data, loading, onDateHover, metric }: StateDataChartProps) {
  const noDataText = loading ? 'Loading...' : 'Unable to load data :('
  const seriesName = metric === 'cases' ? 'Total cases' : 'Total hospitalizations'

  return (
    <Chart
      options={{
        chart: {
          height: 300,
          width: '100%',
          type: 'line',
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false,
            formatter: (val) => {
              onDateHover(val)
              return ''
            },
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
      height={300}
    />
  )
}
