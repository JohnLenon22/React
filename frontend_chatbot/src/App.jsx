import { Routes, Route } from 'react-router-dom';
import  Login  from './components/Login'
import HomeMenu  from './components/HomeMenu'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/HomeMenu" element={<HomeMenu/>} />
    </Routes>
  )
}

export default App
