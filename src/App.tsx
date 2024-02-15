import { Divider } from 'antd'
import Header from './components/Header'
import StateCardList from './components/StateCardList'

export default function App() {
  return (
    <div className="App" data-testid="app-container" style={{ textAlign: 'center' }}>
      <Header />
      <Divider />
      <StateCardList />
    </div>
  )
}
