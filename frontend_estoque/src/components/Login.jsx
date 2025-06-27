import styles from "../modules/Login.module.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senhaHash, setSenhaHash] = useState("");

  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [tipoUsuarioCadastro, setTipoUsuarioCadastro] = useState("OPERADOR");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senhaHash }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      localStorage.setItem("usuarioId", data.id);
      navigate("/Produtos");
    } else {
      alert(data.error || "Erro no login");
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
      alert("Preencha todos os campos");
      return;
    }

    const res = await fetch("http://localhost:3333/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeCadastro,
        email: emailCadastro,
        senhaHash: senhaCadastro,
        tipoUsuario: tipoUsuarioCadastro,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("usuarioId", data.id);
      navigate("/Login");
      setIsModalOpen(false);
      setNomeCadastro("");
      setEmailCadastro("");
      setSenhaCadastro("");
      setTipoUsuarioCadastro("OPERADOR");
    } else {
      alert(data.error || "Erro no cadastro");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.containerForm}>
          <h2 className={styles.textLogin}>LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="••••••••"
                value={senhaHash}
                onChange={(e) => setSenhaHash(e.target.value)}
                required
              />
            </div>

            <div className={styles.containerButton}>
              <button type="submit" className={styles.loginButton}>
                ENTRAR
              </button>
            </div>

            <button
              type="button"
              className={styles.forgotPassword}
              onClick={() => setIsModalOpen(true)}
            >
              Cadastre-se
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.textLogin}>Cadastro</h2>
            <form onSubmit={handleCadastro}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nome</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Digite seu nome"
                  value={nomeCadastro}
                  onChange={(e) => setNomeCadastro(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Digite seu email"
                  value={emailCadastro}
                  onChange={(e) => setEmailCadastro(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Senha</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Digite sua senha"
                  value={senhaCadastro}
                  onChange={(e) => setSenhaCadastro(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Tipo de Usuário</label>
                <select
                  className={styles.input}
                  value={tipoUsuarioCadastro}
                  onChange={(e) => setTipoUsuarioCadastro(e.target.value)}
                >
                  <option value="OPERADOR">OPERADOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className={styles.containerButton}>
                <button type="submit" className={styles.loginButton}>
                  Cadastrar
                </button>
              </div>

              <div className={styles.containerButton}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.loginButton}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
