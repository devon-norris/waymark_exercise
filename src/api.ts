import { StateCode, StateCovidData } from './types'

export const fetchStateCovidData = async (stateCode: StateCode): Promise<StateCovidData[] | null> => {
  try {
    const response = await fetch(`https://api.covidtracking.com/v2/states/${stateCode.toLowerCase()}/daily/simple.json`)
    const json = await response.json()
    return json.data
  } catch (err) {
    console.error(`Error fetching covid data for state ${stateCode}`, err)
    return null
  }
}
