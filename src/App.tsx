import './App.css'
import { Divider } from 'antd'
import Header from './components/Header'
import StateCardList from './components/StateCardList'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Divider />
      <StateCardList />
    </div>
  )
}
