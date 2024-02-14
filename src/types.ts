export type StateCode = 'TN' | 'WA' | 'MD' | 'OH' | 'FL' | 'FL' | 'AZ' | 'WI' | 'RI' | 'GA' | 'KY'

export interface State {
  name: string
  code: StateCode
}

export interface AppContextType {
  selectedStates: StateCode[]
  setSelectedStates: (selectedStates: StateCode[]) => void
}

export interface AppContextState {
  selectedStates: StateCode[]
}

export interface TestMetrics {
  encounters: {
    negative: number | null
    positive: number | null
    total: number | null
  }
  people: {
    negative: number | null
    positive: number | null
    total: number | null
  }
  specimens?: {
    negative: number | null
    positive: number | null
    total: number | null
  }
  total?: number | null
}

export interface StateCovidData {
  date: string
  state: StateCode
  cases: {
    confirmed: number
    probable: number
    total: number
  }
  outcomes: {
    death: {
      confirmed: number
      probable: number
      total: number
    }
    hospitalized: {
      currently: number
      total: number
      in_icu: {
        currently: number
        total: number | null
      }
      on_ventilator: {
        currently: number
        total: number | null
      }
    }
    recovered: number | null
  }
  tests: {
    antibody: TestMetrics
    antigen: TestMetrics
    pcr: TestMetrics
  }
}
