import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Menu from './components/pages/Menu';
import Produtos from './components/pages/Produtos';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Menu" element={<Menu/>}/>
      <Route path='/Produtos' element={<Produtos/>}/>
    </Routes>
  )
}
