import { StateCovidData, ChartMetric } from './types'
import { ROLLING_AVG_DAYS } from './constants'

export const reorderList = ({ list, startIndex, endIndex }: { list: any[]; startIndex: number; endIndex: number }) => {
  const reorderedList = [...list]
  const [removed] = reorderedList.splice(startIndex, 1)
  reorderedList.splice(endIndex, 0, removed)

  return reorderedList
}

export const formatStateCovidData = (data: Omit<StateCovidData, 'timestamp'>[]): StateCovidData[] =>
  data.map((d) => ({ ...d, timestamp: new Date(d.date).getTime() })).sort((a, b) => a.timestamp - b.timestamp)

export const calculateNewCaseRollingAverage = ({ data, index }: { data: StateCovidData[] | null; index: number }) => {
  if (!data) return 0

  const divisor = index < ROLLING_AVG_DAYS ? index + 1 : ROLLING_AVG_DAYS
  const daysBackIndex = index - (divisor - 1)
  const currentTotal = data[index].cases.total
  const daysBackTotal = data[daysBackIndex].cases.total
  const rollingAverage = (currentTotal - daysBackTotal) / divisor
  return Math.round(rollingAverage || 0)
}

export const composeChartData = ({
  data,
  metric,
}: {
  data: StateCovidData[] | null
  metric: ChartMetric
}): {
  chartData: { x: number; y: number }[]
  chartDataMap: Record<string, StateCovidData>
} => {
  const chartData: { x: number; y: number }[] = []
  const chartDataMap: Record<string, StateCovidData> = {}

  for (const [index, d] of (data || []).entries()) {
    chartDataMap[d.timestamp] = { ...d, rollingAverage: calculateNewCaseRollingAverage({ data, index }) }

    const yAxis = metric === 'cases' ? d.cases.total : d.outcomes.hospitalized.total
    chartData.push({ x: d.timestamp, y: yAxis })
  }

  return {
    chartData,
    chartDataMap,
  }
}
