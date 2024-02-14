import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { Card, Radio, RadioChangeEvent, Tooltip } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import { StateCode, StateCovidData } from '../types'
import { fetchStateCovidData } from '../api'
import { STATE_MAP } from '../constants'
import StateDataChart from './StateDataChart'
import StateDateDataBlock from './StateDateDataBlock'

interface ReducerState {
  data: StateCovidData[] | null
  loading: boolean
  metric: 'cases' | 'hospitalizations'
  dateData: StateCovidData | null
}

interface StateCardProps {
  stateCode: StateCode
  removeState: (stateCode: StateCode) => void
}

export default function StateCard({ stateCode, removeState }: StateCardProps) {
  const [{ data, loading, metric, dateData }, setState] = useReducer(
    (prevState: ReducerState, newState: Partial<ReducerState>) => ({
      ...prevState,
      ...newState,
    }),
    { data: null, loading: false, metric: 'cases', dateData: null }
  )

  useEffect(() => {
    setState({ loading: true })
    fetchStateCovidData(stateCode)
      .then((data) => setState({ data }))
      .finally(() => setState({ loading: false }))
  }, [stateCode])

  const { chartData, chartDataMap } = useMemo(() => {
    const chartData: { x: number; y: number }[] = []
    const chartDataMap: Record<string, StateCovidData> = {}

    for (const d of data || []) {
      const timestamp = new Date(d.date).getTime()
      chartDataMap[timestamp] = d

      const yAxis = metric === 'cases' ? d.cases.total : d.outcomes.hospitalized.total
      chartData.push({ x: timestamp, y: yAxis })
    }

    return {
      chartData,
      chartDataMap,
    }
  }, [data, metric])

  const handleHoverDate = useCallback(
    (date: string) => {
      setState({ dateData: chartDataMap[date] || null })
    },
    [setState, chartDataMap]
  )

  const handleToggleMetric = (event: RadioChangeEvent) => {
    setState({ metric: event.target.value })
  }

  const handleRemoveState = () => {
    removeState(stateCode)
  }

  return (
    <Card bodyStyle={{ padding: '16px' }}>
      <div style={{ height: '300px', minWidth: '1200px', display: 'flex', textAlign: 'left' }}>
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Tooltip title="Remove State">
              <DeleteTwoTone
                twoToneColor="red"
                style={{ cursor: 'pointer', fontSize: '1.5em' }}
                onClick={handleRemoveState}
              />
            </Tooltip>
            <h2>{STATE_MAP[stateCode].name}</h2>
          </div>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: 'Cases', value: 'cases' },
              { label: 'Hospitalizations', value: 'hospitalizations' },
            ]}
            value={metric}
            onChange={handleToggleMetric}
          />
          <StateDateDataBlock data={dateData} />
        </div>
        <div style={{ width: '100%' }}>
          <StateDataChart data={chartData} loading={loading} metric={metric} onDateHover={handleHoverDate} />
        </div>
      </div>
    </Card>
  )
}