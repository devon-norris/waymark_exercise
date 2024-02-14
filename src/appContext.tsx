import { useReducer, createContext, useContext, ReactNode, useCallback } from 'react'
import { AppContextType, AppContextState, StateCode } from './types'

const AppContext = createContext<AppContextType>({
  selectedStates: [],
  setSelectedStates: () => {},
  removeState: () => {},
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

  const setSelectedStates = useCallback((states: StateCode[]) => setState({ selectedStates: states }), [setState])

  const removeState = useCallback(
    (stateCode: StateCode) => {
      setSelectedStates(selectedStates.filter((code) => code !== stateCode))
    },
    [selectedStates, setSelectedStates]
  )

  return (
    <AppContext.Provider value={{ selectedStates, setSelectedStates, removeState }}>{children}</AppContext.Provider>
  )
}
