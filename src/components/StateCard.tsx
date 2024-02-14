import { useEffect, useState } from 'react'
import { StateCode, StateCovidData } from '../types'
import { fetchStateCovidData } from '../api'

export default function StateCard({ stateCode }: { stateCode: StateCode }) {
  const [data, setData] = useState<StateCovidData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  // TODO
  console.log(`State ${stateCode}:`, { loading, data })

  useEffect(() => {
    setLoading(true)
    fetchStateCovidData(stateCode)
      .then(setData)
      .finally(() => {
        setLoading(false)
      })
  }, [stateCode])

  return <div style={{ height: '200px', minWidth: '1200px', backgroundColor: 'gray' }}>{stateCode}</div>
}
