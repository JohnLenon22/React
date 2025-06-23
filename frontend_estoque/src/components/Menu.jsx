import styles from '../modules/Menu.module.css';
import logo from '../assets/logo_sistema.png';
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/Dashboard' },
    { text: 'Categorias', path: '/Categorias' },
    { text: 'Produtos', path: '/Produtos' },
    { text: 'Pessoas', path: '/Pessoas' },
    { text: 'Locais Armazenamento', path: '/LocaisArmazenamento' },
    { text: 'Movimentações Estoques', path: '/MovimentacoesEstoque' },
    { text: 'Movimentações Usuário', path: '/MovimentacoesUsuario' }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.titleNav}>
          <img src={logo} alt="Logo" />
          <h2>Supermercado Jesuíno</h2>
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
    </div>
  );
}