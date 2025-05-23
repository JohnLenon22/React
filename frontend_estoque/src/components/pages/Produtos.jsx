import styles from '../modules/Produtos.module.css';
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

export default function Produtos(){
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <div className={styles.titleNav}>
                    <img src={logo} />
                    <h2>Supermercado Jesuíno</h2>
                </div>
                
                <div className={styles.contentNav}>
                    <button onClick={()=> navigate('/Menu')}>Dashboard</button>
                    <button>Categorias</button>
                    <button className={styles.active}>Produtos</button>
                    <button>Locais Armazenamento</button>
                </div>   
            </nav>

            <main className={styles.main}>
                
                <div className={styles.containerTitle}>
                    <h1>Produtos</h1>
                </div>
                    
                <div className={styles.tableBox}>
                    <div className={styles.group}>
                        <div className={styles.groupButtons}>
                            <button className={styles.buttonAdd}>Adicionar Produto</button>
                            <button className={styles.buttonEdit}>Editar Produto</button>
                            <button className={styles.buttonDel}>Excluir Produto</button>
                        </div>
                        <div className={styles.searchBox}>
                            <input type="text" placeholder="Buscar" />
                        </div>
                    </div>
                    
                    
                    <h3>Lista de produtos</h3>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>SKU</th>
                            <th>Quantidade</th>
                            <th>Locais</th>
                            <th>Valor</th>
                        </tr>
                    </table>
                </div>
                
            </main>

        </div>
    )
}