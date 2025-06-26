import { useNavigate } from "react-router-dom";


export default function Unauthorized() {
const navigate = useNavigate()
  return (
    <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "50vh", width: "100vw"}}>
      <div style={{ padding: "2rem", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h2>Acesso Negado</h2>
        <p>Você não tem permissão para acessar essa página.</p>
        <button onClick={() => navigate("/Produtos")}>VOLTAR</button>
      </div>
    </div>
    
  );
}
