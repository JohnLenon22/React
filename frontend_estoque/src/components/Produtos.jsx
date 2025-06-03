import styles from '../modules/Produtos.module.css';
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Produtos(){
    const navigate = useNavigate();
    const [isAddProdutoOpen, setIsAddProdutoOpen] = useState(false);

    const openAddProduto = ( ) => {
        setIsAddProdutoOpen(true)
    }
    const closeAddProduto = ( ) => {
        setIsAddProdutoOpen(false)
    }

    return (
        
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de produtos</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                    <button className={styles.buttonAdd} onClick={openAddProduto}>Adicionar Produto</button>
                    <button className={styles.buttonEdit}>Editar Produto</button>
                    <button className={styles.buttonDel}>Excluir Produto</button>
                    </div>
                    <div className={styles.searchBox}>
                    <input type="text" placeholder="Buscar" />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>SKU</th>
                            <th>Quantidade</th>
                            <th>Locais</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arroz</td>
                            <td>ARZ-001</td>
                            <td>100</td>
                            <td>Prateleira A</td>
                            <td>R$ 25.00</td>
                        </tr>
                        <tr>
                            <td>Feijão</td>
                            <td>FEI-002</td>
                            <td>50</td>
                            <td>Prateleira B</td>
                            <td>R$ 15.00</td>
                        </tr>
                        <tr>
                            <td>Café</td>
                            <td>CAF-003</td>
                            <td>75</td>
                            <td>Prateleira A</td>
                            <td>R$ 10.00</td>
                        </tr>
                        {/* Adicione mais linhas de produtos aqui */}
                    </tbody>
                </table>
            </div>
            {isAddProdutoOpen && (
                <div className={styles.addProdutoModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Produto</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" required />
                            <label>Preço Venda:</label>
                            <input type="text" required />
                            <label>Quantidade:</label>
                            <input type="number" required />
                            <label>Locais:</label>
                            <input type="text" required />
                            <label>Preço Compra:</label>
                            <input type="number" step="0.01" id="valor" name="valor" placeholder="R$ " required />
                            <label>Preço Venda:</label>
                            <input type="number" step="0.01" id="valor" name="valor" placeholder="R$ " required />
                        </form>
                        <button type="submit">Salvar</button>
                        <button onClick={closeAddProduto}>Fechar</button>
                    </div>
                </div>
            )}
        </main>      
    )
}