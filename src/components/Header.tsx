import { useCallback, useState } from 'react'
import { Select, SelectProps, Divider } from 'antd'
import { STATE_MAP, MAX_STATES_SHOWN } from '../constants'
import { StateCode } from '../types'
import { useAppContext } from '../appContext'

export default function Header() {
  const { selectedStates, setSelectedStates } = useAppContext()

  const [stateOptions, setStateOptions] = useState<SelectProps['options']>(
    Object.values(STATE_MAP).map(({ name, code }) => ({ label: name, value: code }))
  )

  const handleChangeSelectedStates = useCallback(
    (selectedStateCodes: StateCode[]) => {
      // Handle setting other options as disabled if we hit the MAX_STATES_SHOWN
      const newStateOptions: SelectProps['options'] =
        selectedStateCodes.length >= MAX_STATES_SHOWN
          ? stateOptions?.map((state) => ({
              ...state,
              ...(!selectedStateCodes.includes(state.value as StateCode) && { disabled: true }),
            }))
          : stateOptions?.map((state) => ({ ...state, disabled: false }))

      setStateOptions(newStateOptions)
      setSelectedStates(selectedStateCodes)
    },
    [stateOptions, setStateOptions, setSelectedStates]
  )

  return (
    <div>
      <h2>COVID-19 U.S. state data</h2>
      <p>Pick states to view historical COVID-19 data for. Drag state cards to rearrange and compare!</p>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '600px' }}
        placeholder="Please select states"
        onChange={handleChangeSelectedStates}
        value={selectedStates}
        options={stateOptions}
      />
      <p style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>Select up to 5 states at a time</p>
      <Divider />
    </div>
  )
}
