// import styles from "../modules/Login.module.css";
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// export default function Login() {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [senha, setSenha] = useState('');

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [emailCadastro, setEmailCadastro] = useState('');
//     const [senhaCadastro, setSenhaCadastro] = useState('');

//     // Login
//     const handleLogin = (e) => {
//         e.preventDefault();

//         const user = JSON.parse(localStorage.getItem('user'));

//         if (user && user.email === email && user.senha === senha) {
//             localStorage.setItem('user', JSON.stringify({ email, senha }));
//             navigate('/Menu');
//         } else {
//             alert('Email ou senha incorretos');
//         }
//     };

//     // Cadastro
//     const handleCadastro = (e) => {
//         e.preventDefault();

//         if (!emailCadastro || !senhaCadastro) {
//             alert('Preencha todos os campos');
//             return;
//         }

//         const user = { email: emailCadastro, senha: senhaCadastro };
//         localStorage.setItem('user', JSON.stringify(user));

//         alert('Usuário cadastrado com sucesso!');
//         setIsModalOpen(false);
//         setEmailCadastro('');
//         setSenhaCadastro('');
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.container2}>
//                 <div className={styles.containerForm}>
//                     <h2 className={styles.textLogin}>LOGIN</h2>
//                     <form onSubmit={handleLogin}>
//                         <div className={styles.inputGroup}>
//                             <label htmlFor="email" className={styles.label}>Email</label>
//                             <input 
//                                 type="email" 
//                                 id="email" 
//                                 className={styles.input} 
//                                 placeholder="admin@gmail.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             required/>
//                         </div>
                        
//                         <div className={styles.inputGroup}>
//                             <label htmlFor="password" className={styles.label}>Senha</label>
//                             <input 
//                                 type="password" 
//                                 id="password" 
//                                 className={styles.input} 
//                                 placeholder="••••••••"
//                                 value={senha}
//                                 onChange={(e) => setSenha(e.target.value)}
//                             required/>
//                         </div>

//                         <div className={styles.containerForgotPassword}>
//                             <a href="#" className={styles.forgotPassword}>Recuperar senha</a>
//                                 <button 
//                                 type="button" 
//                                 onClick={() => setIsModalOpen(true)} 
//                                 className={styles.forgotPassword}
//                                 >
//                                 Cadastre-se
//                             </button>
//                         </div>

//                         <div className={styles.containerButton}> 
//                             <button type="submit" className={styles.loginButton} onClick={handleLogin}>ENTRAR</button>
//                         </div>

                        
//                     </form>
//                 </div>
//             </div>

//             {/* MODAL DE CADASTRO */}
//             {isModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <h2 className={styles.textLogin}>Cadastro</h2>
//                         <form onSubmit={handleCadastro}>
//                             <div className={styles.inputGroup}>
//                                 <label className={styles.label}>Email</label>
//                                 <input 
//                                     type="email"
//                                     className={styles.input}
//                                     placeholder="Digite seu email"
//                                     value={emailCadastro}
//                                     onChange={(e) => setEmailCadastro(e.target.value)}
//                                 />
//                             </div>

//                             <div className={styles.inputGroup}>
//                                 <label className={styles.label}>Senha</label>
//                                 <input 
//                                     type="password"
//                                     className={styles.input}
//                                     placeholder="Digite sua senha"
//                                     value={senhaCadastro}
//                                     onChange={(e) => setSenhaCadastro(e.target.value)}
//                                 />
//                             </div>

//                             <div className={styles.containerButton}>
//                                 <button type="submit" className={styles.loginButton}>Cadastrar</button>
//                             </div>

//                             <div className={styles.containerButton}>
//                                 <button 
//                                     type="button" 
//                                     onClick={() => setIsModalOpen(false)} 
//                                     className={styles.loginButton}
//                                 >
//                                     Fechar
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
