import { render, screen } from '@testing-library/react'
import App from './App'

test('renders app container', () => {
  render(<App />)

  expect(screen.getByTestId('app-container')).toBeVisible()
  expect(screen.getByTestId('header')).toBeVisible()
  expect(screen.getByTestId('state-card-list')).toBeVisible()
})
