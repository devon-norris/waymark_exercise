import { ReactNode } from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAppContext, AppContextProvider } from './appContext'

const wrapper = ({ children }: { children: ReactNode }) => <AppContextProvider>{children}</AppContextProvider>

describe('appContext', () => {
  it('renders default state', () => {
    const { result } = renderHook(useAppContext, { wrapper })

    expect(result.current).toEqual({
      selectedStates: [],
      setSelectedStates: expect.any(Function),
      removeState: expect.any(Function),
    })
  })

  it('sets selected states', async () => {
    const { result } = renderHook(useAppContext, { wrapper })

    act(() => result.current.setSelectedStates(['AZ', 'FL']))
    await waitFor(() => {
      expect(result.current.selectedStates).toEqual(['AZ', 'FL'])
    })

    act(() => result.current.setSelectedStates(['GA', 'OH', 'RI']))
    await waitFor(() => {
      expect(result.current.selectedStates).toEqual(['GA', 'OH', 'RI'])
    })
  })

  it('removes state', async () => {
    const { result } = renderHook(useAppContext, { wrapper })

    act(() => result.current.setSelectedStates(['GA', 'OH', 'RI']))
    await waitFor(() => {
      expect(result.current.selectedStates).toEqual(['GA', 'OH', 'RI'])
    })

    act(() => result.current.removeState('OH'))
    await waitFor(() => {
      expect(result.current.selectedStates).toEqual(['GA', 'RI'])
    })
  })
})
