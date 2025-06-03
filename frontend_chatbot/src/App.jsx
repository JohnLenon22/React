import { Routes, Route } from 'react-router-dom';
import  Login  from './components/Login'
import HomeMenu  from './components/HomeMenu'
import Protocols from './components/Protocols'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/HomeMenu" element={<HomeMenu/>} />
      <Route path="/Protocols" element={<Protocols/>} />
    </Routes>
  )
}

export default App
