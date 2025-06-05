import styles from '../modules/Produtos.module.css';
import { useContext, useState } from 'react';
import { ProdutoContext } from '../contexts/ProdutoContext';

export default function Produtos(){
    
    const [isAddProdutoOpen, setIsAddProdutoOpen] = useState(false);
    const {produtos, deletarProduto, filtro, setFiltro}  = useContext(ProdutoContext)
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        idCategoria: '',
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        precoVenda: 0,
        precoCompra: 0,
        descricao: ''
    })


    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.idCategoria.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.dataCadastro.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.precoVenda.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.precoCompra.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    )

    const openAddProduto = ( ) => {
        setIsAddProdutoOpen(true)
    }
    const closeAddProduto = ( ) => {
        setIsAddProdutoOpen(false)
    }

    function handleExcluirProduto(id){
        const confirmacao = window.confirm("Deseja excluir o produto?");
        if (confirmacao) {
            deletarProduto(id);
        }
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
                    </div>
                    <div className={styles.searchBox}>
                        <form>
                            <input 
                                type="text" 
                                placeholder="Buscar" 
                                value={filtro}
                                onChange={(e)=> setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Data Cadastro</th>
                            <th>Preço Compra</th>
                            <th>Preço Venda</th>
                            <th>Descricao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map((produto) => (
                            <tr key={produto}>
                                <td>{produto.nome}</td>
                                <td>{produto.idCategoria}</td>
                                <td>{produto.dataCadastro}</td>
                                <td>{produto.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.precoCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.descricao}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhum produto encontrado.</td>
                            </tr>
                        )}
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
                            <input type="number" required />
                            <label>Categoria:</label>
                            <input type="text" required />
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