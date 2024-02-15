import { useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
import { STATE_MAP, MAX_STATES_SHOWN } from '../constants'
import { StateCode } from '../types'
import { useAppContext } from '../appContext'

const defaultStateOptions: SelectProps['options'] = Object.values(STATE_MAP)
  .map(({ name, code }) => ({
    label: name,
    value: code,
    disabled: false,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export default function Header() {
  const { selectedStates, setSelectedStates } = useAppContext()

  const [stateOptions, setStateOptions] = useState<SelectProps['options']>(defaultStateOptions)

  const handleChangeSelectedStates = (selectedStateCodes: StateCode[]) => {
    setSelectedStates(selectedStateCodes)
  }

  useEffect(() => {
    // Handle setting other options as disabled if we hit the MAX_STATES_SHOWN
    const areMaxStatesSelected = selectedStates.length >= MAX_STATES_SHOWN
    setStateOptions(
      defaultStateOptions?.map((state) => ({
        ...state,
        disabled: areMaxStatesSelected && !selectedStates.includes(state.value as StateCode),
      }))
    )
  }, [selectedStates, setStateOptions])

  return (
    <div data-testid="header">
      <h2>COVID-19 U.S. state data</h2>
      <p>
        Select states to view corresponding historical COVID-19 data. Drag state graphs to rearrange and compare data.
      </p>
      <Select
        data-testid="state-select"
        mode="multiple"
        style={{ width: '600px' }}
        placeholder="Please select states"
        onChange={handleChangeSelectedStates}
        value={selectedStates}
        options={stateOptions}
      />
      <p style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>Select up to five (5) states at a time.</p>
    </div>
  )
}
