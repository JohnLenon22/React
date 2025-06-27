import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, senhaHash) => {
    try {
      const response = await fetch("http://localhost:3333/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senhaHash }),
      });

      const data = await response.json();
      if (response.ok) {
        const resUser = await fetch(`http://localhost:3333/users/${data.id}`);
        const userData = await resUser.json();
        localStorage.setItem("usuarioId", data.id);
        localStorage.setItem("usuarioTipo", userData.tipoUsuario);
        localStorage.setItem("usuarioNome", userData.nome);
        setUser(userData);
        if(userData.tipoUsuario === 'ADMIN'){
          navigate("/Dashboard");
        }else{
          navigate("/Produtos");
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Erro no login");
    }
  };

  const logout = () => {
    localStorage.removeItem("usuarioId");
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const loadUser = async () => {
      const id = localStorage.getItem("usuarioId");
      if (id) {
        const res = await fetch(`http://localhost:3333/users/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          if(data.tipoUsuario === 'ADMIN'){
            navigate("/Dashboard");
          }else{
            navigate("/Produtos");
          }
          
        }
      }
    };
    loadUser();
  }, []);

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
