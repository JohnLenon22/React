import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu'
import Login from './components/login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Menu" element={<Menu/>}/>
    </Routes>
  )
}
