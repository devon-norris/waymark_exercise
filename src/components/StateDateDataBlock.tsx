import _get from 'lodash.get'
import { StateCovidData } from '../types'

const dataFields: { label: string; path: string }[] = [
  { label: 'Total PCR tests', path: 'tests.pcr.total' },
  { label: 'Total recovered', path: 'outcomes.recovered' },
  { label: 'Current in ICU', path: 'outcomes.hospitalized.in_icu.currently' },
  { label: 'Currently on ventilator', path: 'outcomes.hospitalized.on_ventilator.currently' },
  { label: 'Current hospitalizations', path: 'outcomes.hospitalized.currently' },
  //   { label: '', path: '' }, // TODO: add 7 day rolling average
]

interface StateDateDataBlockProps {
  data: StateCovidData | null
}

export default function StateDateDataBlock({ data }: StateDateDataBlockProps) {
  if (!data) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {dataFields.map(({ label, path }) => (
        <div key={path}>
          <b>{label}: </b>
          <span>{_get(data, path) || 'n/a'}</span>
        </div>
      ))}
    </div>
  )
}
