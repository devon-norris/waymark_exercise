import _get from 'lodash.get'
import { StateCovidData } from '../types'
import { ROLLING_AVG_DAYS } from '../constants'

const dataFields: { label: string; path: string; testId: string }[] = [
  { label: 'Date', path: 'date', testId: 'date' },
  { label: `${ROLLING_AVG_DAYS} day new case rolling average`, path: 'rollingAverage', testId: 'rollingAverage' },
  { label: 'Total PCR tests', path: 'tests.pcr.total', testId: 'pcrTotal' },
  { label: 'Total recovered', path: 'outcomes.recovered', testId: 'recovered' },
  { label: 'Current in ICU', path: 'outcomes.hospitalized.in_icu.currently', testId: 'icuCurrently' },
  {
    label: 'Currently on ventilator',
    path: 'outcomes.hospitalized.on_ventilator.currently',
    testId: 'ventilatorCurrently',
  },
  { label: 'Current hospitalizations', path: 'outcomes.hospitalized.currently', testId: 'hospitalizedCurrently' },
]

interface StateDateDataBlockProps {
  data: StateCovidData | null
}

export default function StateDateDataBlock({ data }: StateDateDataBlockProps) {
  if (!data) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {dataFields.map(({ label, path, testId }) => (
        <div key={path}>
          <b>{label}: </b>
          <span data-testid={testId}>{_get(data, path) || 'unknown'}</span>
        </div>
      ))}
    </div>
  )
}
