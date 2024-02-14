import { useReducer, createContext, useContext, ReactNode } from 'react'
import { AppContextType, AppContextState, StateCode } from './types'

const AppContext = createContext<AppContextType>({
  selectedStates: [],
  setSelectedStates: () => {},
})

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [{ selectedStates }, setState] = useReducer(
    (prevState: AppContextState, newState: Partial<AppContextState>) => ({
      ...prevState,
      ...newState,
    }),
    { selectedStates: [] }
  )

  const setSelectedStates = (states: StateCode[]) => setState({ selectedStates: states })

  return <AppContext.Provider value={{ selectedStates, setSelectedStates }}>{children}</AppContext.Provider>
}
