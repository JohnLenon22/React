// App.jsx
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Produtos from './components/Produtos';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu />
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Produtos" element={<Produtos/>} />
        </Routes>
    </div>
  );
}

export default App;