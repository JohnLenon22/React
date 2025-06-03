import styles from "../modules/Login.module.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
          <div className={styles.containerForm}>
            <h2 className={styles.textLogin}>LOGIN</h2>
            <form>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" className={styles.input} placeholder="admin@gmail.com" />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Senha </label>
                <input type="password" id="password" className={styles.input} placeholder="••••••••" />
              </div>

              <div className={styles.containerForgotPassword}>
                <a href="#" className={styles.forgotPassword}>Recuperar senha</a>
              </div>

              <div className={styles.containerButton}> 
                <button type="submit" onClick={() => navigate('/HomeMenu')} className={styles.loginButton}>ENTRAR</button>
              </div>
               
            </form>
          </div>
        </div>
    </div>
   
  )
}
