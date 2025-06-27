import { useNavigate } from "react-router-dom";
import styles from "../../modules/Unauthorized.module.css";

export default function Unauthorized() {
  const navigate = useNavigate()
  const usuarioId = localStorage.getItem("usuarioId");

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Acesso Negado</h2>
        <p>Você não tem permissão para acessar essa página.</p>
        {usuarioId==='' ? (
          <button onClick={() => navigate("/")}>VOLTAR</button>
        ) : (
          <button onClick={() => navigate("/Produtos")}>VOLTAR PARA LOGIN</button>
        )}
        
      </div>
    </div>
    
  );
}
