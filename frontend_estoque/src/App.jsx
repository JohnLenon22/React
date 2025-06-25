// // App.jsx
// import { Routes, Route } from 'react-router-dom';
// import Menu from './components/Menu';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Produtos from './components/Produtos';
// import Pessoas from './components/Pessoas';
// import Categorias from './components/Categorias';
// import LocaisArmazenamento from './components/LocaisArmazenamento';
// import MovimentacoesEstoque from './components/MovimentacoesEstoque';
// import Usuarios from './components/Usuarios';
// import { CategoriaProvider } from './contexts/CategoriaContext';
// import { ProdutoProvider } from './contexts/ProdutoContext';
// import { LocalArmazenamentoProvider } from './contexts/LocalArmazenamentoContext';
// import { MovimentacaoEstoqueProvider } from './contexts/MovimentacaoEstoqueContext';
// import { PessoaProvider } from './contexts/PessoaContext';
// import { UsuarioProvider } from './contexts/UsuarioContext';


// function AppProviders({ children }) {
//   return (
//     <CategoriaProvider>
//       <ProdutoProvider>
//         <LocalArmazenamentoProvider>
//           <MovimentacaoEstoqueProvider>
//             <PessoaProvider>
//               <UsuarioProvider>
//                 { children }
//               </UsuarioProvider>
//             </PessoaProvider>
//           </MovimentacaoEstoqueProvider>
//         </LocalArmazenamentoProvider>
//       </ProdutoProvider>
//     </CategoriaProvider>  
//   );
// }

// function App() {
//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <AppProviders>
//       <Menu />
//       <Routes>
//         {/* <Route path="/Login" element={<Login/>} /> */}
//         <Route path="/Dashboard" element={<Dashboard/>} />
//         <Route path="/Produtos" element={<Produtos/>} />
//         <Route path="/Categorias" element={<Categorias/>} />
//         <Route path="/LocaisArmazenamento" element={<LocaisArmazenamento/>} />
//         <Route path="/MovimentacoesEstoque" element={<MovimentacoesEstoque/>} />
//         <Route path="/Usuarios" element={<Usuarios/>} />
//         <Route path="/Pessoas" element={<Pessoas/>} />
//       </Routes>   
//       </AppProviders>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Produtos from './components/Produtos';
import Pessoas from './components/Pessoas';
import Categorias from './components/Categorias';
import LocaisArmazenamento from './components/LocaisArmazenamento';
import MovimentacoesEstoque from './components/MovimentacoesEstoque';
import Usuarios from './components/Usuarios';
import PrivateRoute from './components/Auth/PrivateRoute';

import Unauthorized from './components/Auth/Unauthorized';

import { AuthProvider } from './components/Auth/AuthContext';
import { CategoriaProvider } from "./contexts/CategoriaContext";
import { ProdutoProvider } from "./contexts/ProdutoContext";
import { LocalArmazenamentoProvider } from "./contexts/LocalArmazenamentoContext";
import { MovimentacaoEstoqueProvider } from "./contexts/MovimentacaoEstoqueContext";
import { PessoaProvider } from "./contexts/PessoaContext";
import { UsuarioProvider } from "./contexts/UsuarioContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AppProviders>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Unauthorized" element={<Unauthorized/>}/>

          <Route path="/Dashboard" element={<PrivateRoute allowedRoles={["ADMIN"]}> <Menu /><Dashboard /> </PrivateRoute> } />
          
          <Route path="/Produtos" element={ <PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]}> <Menu /><Produtos /> </PrivateRoute> } />

          <Route path="/Pessoas" element={ <PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]}> <Menu /><Pessoas /> </PrivateRoute> } />

          <Route path="/Categorias" element={ <PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]}> <Menu /><Categorias />  </PrivateRoute> } />

          <Route path="/Usuarios" element={ <PrivateRoute allowedRoles={["ADMIN"]}> <Menu /><Usuarios/> </PrivateRoute> } />

          <Route path="/LocaisArmazenamento" element={ <PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]}> <Menu /><LocaisArmazenamento /> </PrivateRoute> } />

          <Route path="/MovimentacoesEstoque" element={ <PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]}> <Menu /><MovimentacoesEstoque /> </PrivateRoute> } />

        </Routes>
      </AppProviders>
    </div>
  );
}

export default App;