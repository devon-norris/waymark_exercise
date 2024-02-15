import { StateCode, StateCovidData } from './types'
import { formatStateCovidData } from './helpers'

export const fetchStateCovidData = async (stateCode: StateCode): Promise<StateCovidData[] | null> => {
  try {
    const response = await fetch(`https://api.covidtracking.com/v2/states/${stateCode.toLowerCase()}/daily/simple.json`)
    const json = await response.json()
    return formatStateCovidData(json.data)
  } catch (err) {
    console.error(`Error fetching covid data for state ${stateCode}`, err)
    return null
  }
}
