import styles from '../modules/Menu.module.css';
import logoStockUp from '../assets/logoStockUp.png';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modalLogout, setModalLogout] = useState(false);
  const [usuario, setUsuario] = useState({ nome: '', tipoUsuario: '' });

  const openModalLogout = () => {
    setModalLogout(true);
  };

  const closeModalLogout = () => {
    localStorage.removeItem('usuarioId');
    setModalLogout(false);
    navigate('/');
  };

  useEffect(() => { 
    const fetchUsuario = async() => {
      const usuarioId = localStorage.getItem('usuarioId');
      if (!usuarioId){
        return usuario;
      }

      try{
        const res = await fetch(`http://localhost:3333/users/${usuarioId}`)
        if (res.ok) {
          const data = await res.json();
          setUsuario({ nome: data.nome, tipoUsuario: data.tipoUsuario });
        } else {
          console.log('Erro ao buscar usuário');
        }
      }catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };
    fetchUsuario();
  }, []);

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
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <p>Usuário: {usuario.nome}</p>
            <p>Tipo: {usuario.tipoUsuario}</p>
          </div>
          <div className={styles.buttonLogout} >
            <button onClick={openModalLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        </div>
      </nav>
      {modalLogout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirmação</h2>
            <p>Você tem certeza que deseja sair?</p>
            <button onClick={closeModalLogout} className={styles.confirmButton}>Sim</button>
            <button onClick={() => setModalLogout(false)} className={styles.cancelButton}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
}