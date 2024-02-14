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
