import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
// import * as appContext from '../appContext'

describe('<App />', () => {
  it('renders app container', () => {
    render(<App />)

    expect(screen.getByTestId('app-container')).toBeVisible()
    expect(screen.getByTestId('header')).toBeVisible()
    expect(screen.getByTestId('state-card-list')).toBeVisible()
  })

  it('selects multiple states', async () => {
    // const setSelectedStates = jest.fn()
    // const useAppContextSpy = jest
    //   .spyOn(appContext, 'useAppContext')
    //   .mockImplementation(() => ({ setSelectedStates, removeState: jest.fn(), selectedStates: [] }))
    render(<App />)

    const select = screen.getByText('Please select states')

    fireEvent.mouseDown(select)

    const option = screen.getByText('Tennessee')

    userEvent.click(option, undefined, { skipPointerEventsCheck: true })

    await screen.findByTestId('state-card-TN')

    // expect(screen.getByTestId('state-card-TN')).toBeVisible()

    // expect(setSelectedStates).toHaveBeenCalledWith(['TN'])
  })
})
