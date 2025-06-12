// App.jsx
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Produtos from './components/Produtos';
import Categorias from './components/Categorias';
import LocaisArmazenamento from './components/LocaisArmazenamento';
import MovimentacoesEstoque from './components/MovimentacoesEstoque';
import { ProdutoProvider } from './contexts/ProdutoContext'; 
import { CategoriaProvider } from './contexts/CategoriaContext';



function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu />
        {/* <ProdutoProvider>
        <CategoriaProvider> */}
        <LocaisArmazenamento>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/Produtos" element={<Produtos/>} />
            <Route path="/Categorias" element={<Categorias/>} />
            <Route path="/LocaisArmazenamento" element={<LocaisArmazenamento/>} />
            <Route path="/MovimentacoesEstoque" element={<MovimentacoesEstoque/>} />
            {/* <Route path="/Movimentações Usuario" element={<MovimentacoesUsuario/>} /> */}
            </Routes>
        </LocaisArmazenamento>
        {/* </CategoriaProvider>
        </ProdutoProvider> */}
        
    </div>
  );
}

export default App;