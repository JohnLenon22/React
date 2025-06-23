// App.jsx
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Produtos from './components/Produtos';
import Pessoas from './components/Pessoas';
import Categorias from './components/Categorias';
import LocaisArmazenamento from './components/LocaisArmazenamento';
import MovimentacoesEstoque from './components/MovimentacoesEstoque';
import { CategoriaProvider } from './contexts/CategoriaContext';
import { ProdutoProvider } from './contexts/ProdutoContext';
import { LocalArmazenamentoProvider } from './contexts/LocalArmazenamentoContext';
import { MovimentacaoEstoqueProvider } from './contexts/MovimentacaoEstoqueContext';
import { PessoaProvider } from './contexts/PessoaContext';
import { UsuarioProvider } from './contexts/UsuarioContext';



function AppProviders({ children }) {
  return (
    <CategoriaProvider>
      <ProdutoProvider>
        <LocalArmazenamentoProvider>
          <MovimentacaoEstoqueProvider>
            <PessoaProvider>
              <UsuarioProvider>
                { children }
              </UsuarioProvider>
            </PessoaProvider>
          </MovimentacaoEstoqueProvider>
        </LocalArmazenamentoProvider>
      </ProdutoProvider>
    </CategoriaProvider>  
  );
}

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu />
      <AppProviders>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Produtos" element={<Produtos/>} />
        <Route path="/Categorias" element={<Categorias/>} />
        <Route path="/LocaisArmazenamento" element={<LocaisArmazenamento/>} />
        <Route path="/MovimentacoesEstoque" element={<MovimentacoesEstoque/>} />
        <Route path="/Pessoas" element={<Pessoas/>} />

      </Routes>   
      </AppProviders>
    </div>
  );
}

export default App;