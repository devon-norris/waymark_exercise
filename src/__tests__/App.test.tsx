import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import StateCardList from '../components/StateCardList'
import StateDateDataBlock from '../components/StateDateDataBlock'
import * as appContext from '../appContext'
import { StateCovidData } from '../types'

jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }))

it('renders app container', () => {
  render(<App />)

  expect(screen.getByTestId('app-container')).toBeVisible()
  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.getByTestId('state-card-list')).toBeVisible()
})

it('renders state cards', () => {
  jest
    .spyOn(appContext, 'useAppContext')
    .mockImplementation(() => ({ selectedStates: ['GA', 'FL'], setSelectedStates: jest.fn(), removeState: jest.fn() }))

  render(<StateCardList />)

  expect(screen.getByTestId('state-card-GA')).toBeVisible()
  expect(screen.getByTestId('state-card-FL')).toBeVisible()
  expect(screen.getByText('Georgia')).toBeVisible()
  expect(screen.getByText('Florida')).toBeVisible()

  expect(screen.queryByTestId('state-card-TN')).toBeFalsy()
})

it('calls removeState when clicking button', () => {
  const removeState = jest.fn()
  jest
    .spyOn(appContext, 'useAppContext')
    .mockImplementation(() => ({ selectedStates: ['GA', 'FL'], setSelectedStates: jest.fn(), removeState }))

  render(<StateCardList />)

  fireEvent.click(screen.getByTestId('remove-state-GA'))
  expect(removeState).toHaveBeenCalledWith('GA')
})

it('display data for a given date block', () => {
  const mockData = {
    date: '2021-01-01',
    rollingAverage: 2033,
    tests: { pcr: { total: 5000 } },
    outcomes: {
      recovered: 250,
      hospitalized: { currently: 100, in_icu: { currently: 30 }, on_ventilator: { currently: 5 } },
    },
  } as StateCovidData

  render(<StateDateDataBlock data={mockData} />)

  expect(screen.getByTestId('date').innerHTML).toEqual(mockData.date)
  expect(screen.getByTestId('rollingAverage').innerHTML).toEqual(`${mockData.rollingAverage}`)
  expect(screen.getByTestId('pcrTotal').innerHTML).toEqual(`${mockData.tests.pcr.total}`)
  expect(screen.getByTestId('recovered').innerHTML).toEqual(`${mockData.outcomes.recovered}`)
  expect(screen.getByTestId('icuCurrently').innerHTML).toEqual(`${mockData.outcomes.hospitalized.in_icu.currently}`)
  expect(screen.getByTestId('ventilatorCurrently').innerHTML).toEqual(
    `${mockData.outcomes.hospitalized.on_ventilator.currently}`
  )
  expect(screen.getByTestId('hospitalizedCurrently').innerHTML).toEqual(`${mockData.outcomes.hospitalized.currently}`)
})
