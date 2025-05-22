import styles from './Menu.module.css';
import logo from '../assets/logo.png'

export default function Menu(){
    return(
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <div className={styles.titleNav}>
                    <img src={logo} />
                    <h2>Supermercado Jesuíno</h2>
                </div>
                
                <div className={styles.contentNav}>
                    <button>Dashboard</button>
                    <button>Categoria</button>
                    <button>Produto</button>
                    <button>Local Armazenamento</button>
                </div>   
            </nav>

            <main className={styles.main}>
                <h1>Estocaí</h1>

                <div className={styles.cardContainer}>
                    <div className={styles.groupcard}>
                        <div className={styles.card}>
                            <label>Total de produtos</label>
                            <h2>3.989</h2>
                        </div>

                        <div className={styles.card}>  
                            <label>Valor Estocado</label>
                            <h2>R$ 348.920</h2>
                        </div>
                    </div>
                    
                    <div className={styles.groupcard}>
                        <div className={styles.card}>
                            <label>Fora de estoque</label>
                            <h2>2</h2>
                        </div>
                        <div className={styles.searchBox}>
                            <input type="text" placeholder="Buscar" />
                        </div>
                    </div>
                </div>
            
                <div className={styles.tableContainer}>
                    <div className={styles.tableBox}>
                        <h3>Alertas de Estoque</h3>
                        {/* Tabela de alertas entra aqui */}
                    </div>
                    <div className={styles.tableBox}>
                        <h3>Lista de produtos</h3>
                        {/* Tabela de produtos entra aqui */}
                    </div>
                </div>
                
            </main>
        </div>
    )

}