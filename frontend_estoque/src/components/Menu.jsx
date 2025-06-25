import styles from '../modules/Menu.module.css';
import logoStockUp from '../assets/logoStockUp.png';
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () =>{
    localStorage.removeItem('usuarioId');
    navigate('/');
  }


  const menuItems = [
    { text: 'Dashboard', path: '/Dashboard' },
    { text: 'Categorias', path: '/Categorias' },
    { text: 'Produtos', path: '/Produtos' },
    { text: 'Pessoas', path: '/Pessoas' }, 
    { text: 'Usuários', path: '/Usuarios' },
    { text: 'Locais Armazenamento', path: '/LocaisArmazenamento' },
    { text: 'Movimentações Estoques', path: '/MovimentacoesEstoque' },
   
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.titleNav}>
          <img src={logoStockUp} alt="Logo" />
        </div>

        <div className={styles.contentNav}>
          {menuItems.map((item) => (
            <button
              key={item.text}
              className={location.pathname === item.path ? styles.active : ''}
              onClick={() => navigate(item.path)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </nav>
      <button onClick={() => logout()}></button>
    </div>
  );
}