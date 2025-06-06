import styles from '../modules/Produtos.module.css';
import { useContext, useState } from 'react';
// import { MovimentacaoEstoqueContext } from '../contexts/MovimentacaoEstoqueContext';
export default function MovimentacoesEstoque(){
    
    // const [isAddMovimentacaoOpen, setIsAddMovimentacaoOpen] = useState(false);
    // const {movimentacoes, deletarMovimentacao, adicionarMovimentacao, filtro, setFiltro}  = useContext(MovimentacaoEstoqueContext)
    // const [novaMovimentacao, setNovaMovimentacao] = useState({
    //     tipoMovimentacao: '',
    //     quantidade: '',
    //     idProduto: '',
    //     idUsuario: '',
    //     idUsuarioMovimentacao: '',
    //     idLocalArmazenamento: '',
    // })

    // const movimentacoesFiltradas = movimentacoes.filter(movimentacao =>
    //     movimentacao.tipoMovimentacao.toUpperCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.quantidade.toLowerCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.data.toLowerCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.idProduto.toLowerCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.idUsuario.toString().toLowerCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.idUsuarioMovimentacao.toString().toLowerCase().includes(filtro.toLowerCase()) ||
    //     movimentacao.idLocalArmazenamento.toLowerCase().includes(filtro.toLowerCase())
    // )

    // const openAddMovimentacao = ( ) => {
    //     setNovoMovimentacao({
    //         tipoMovimentacao: '',
    //         quantidade: '',
    //         idProduto: '',
    //         idUsuario: '',
    //         idUsuarioMovimentacao: '',
    //         idLocalArmazenamento: '',
    //     });
    //     setIsAddMovimentacaoOpen(true)
    // }

    // const closeAddMovimentacao = ( ) => {
    //     setIsAddMovimentacaoOpen(false)
    // }

    // function handleSalvarMovimentacao() {
    //     if (!novoMovimentacao.tipoMovimentacao || !novoProduto.quantidade || !novoProduto.idProduto  || !novoProduto.idUsuario || !novoProduto.idUsuarioMovimentacao || !novoProduto.idLocalArmazenamento === '' ) {
    //         alert('Por favor, preencha todos os campos!');
    //         return;
    //     }

    //     const dadosMovimentacao = {
    //         ...dadosMovimentacao,
    //         precoCompra: parseInt(dadosMovimentacao.quantidade),    
    //         data: new Date().toLocaleDateString('pt-BR'), 
    //     };
    //     console.log("Dados dam ovimentacao sendo enviados:", dadosMovimentacao);
    //     adicionarMovimentacao(dadosMovimentacao); 
    //     closeAddMovimentacao(); 
    // };

    // function handleExcluirProduto(id){
    //     const confirmacao = window.confirm("Deseja excluir o produto?");
    //     if (confirmacao) {
    //         deletarProduto(id);
    //     }
    // }

    return (
        
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Movimentações Estoque</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        {/* <button className={styles.buttonAdd} onClick={openAddMovimentacao}>Realizar Movimentação Estoque</button> */}
                    </div>
                    <div className={styles.searchBox}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="text" 
                                placeholder="Buscar" 
                                // value={filtro}
                                // onChange={(e)=> setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Tipo Movimentacao</th>
                            <th>Quantidade</th>
                            <th>Produto</th>
                            <th>Usuario</th>
                            <th>Usuario Movimentacao</th>
                            <th>Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {movimentacoesFiltradas.length > 0 ? (
                            movimentacoesFiltradas.map((movimentacao) => (
                            <tr key={movimentacao.id}>
                                <td>{movimentacao.tipoMovimentacao}</td>
                                <td>{movimentacao.quantidade}</td>
                                <td>{movimentacao.idProduto}</td>
                                <td>{movimentacao.idUsuario}</td>
                                <td>{movimentacao.idUsuarioMovimentacao}</td>
                                <td>{movimentacao.idLocalArmazenamento}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhuma Movimentação Estoque encontrado.</td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>
            {/* {isAddMovimentacaoOpen && (
                <div className={styles.addMovimentacaoModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Produto</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Tipo:</label>
                            <input type="text" id="tipoMovimentacao" value={novaMovimentacao.tipoMovimentacao} onChange={(e) => setNovaMovimentacao({...novaMovimentacao, tipoMovimentacao: e.target.value})} placeholder="ENTRADA | SAIDA | TRANSFERENCIA" required />
                            <label>Quantidade:</label>
                            <input type="number" id="quantidade" value={novaMovimentacao.quantidade} onChange={(e) => setNovaMovimentacao({...novaMovimentacao, idCategoria: e.target.value})} required />
                            <label>ID do Produto:</label>
                            <input type="text" id="idProduto" step="0.01" value={novaMovimentacao.idProduto} onChange={(e) => setNovaMovimentacao({...novaMovimentacao, idProduto: e.target.value})} placeholder="R$ " required />
                            <label>ID do Usuario:</label>
                            <input type="text" id="idUsuario" step="0.01" value={novaMovimentacao.idUsuario} onChange={(e) => setNovaMovimentacao({...novaMovimentacao, idUsuario: e.target.value})} placeholder="R$ " required />
                            <label>ID do Usuario Movimentacao:</label>
                            <input type="text" id="idUsuarioMovimentacao" step="0.01" value={novaMovimentacao.idUsuarioMovimentacao} onChange={(e) => setNovaMovimentacao({...novaMovimentacao, idUsuarioMovimentacao: e.target.value})} placeholder="R$ " required />
                            <label>ID do Local:</label>
                            <input type="text" id="idLocalArmazenamento" value={novaMovimentacao.idLocalArmazenamento} onChange={(e) => setNovoProduto({...novaMovimentacao, local: e.target.value})} required />
                        </form>
                        <button type="button" onClick={handleSalvarMovimentacao}>Salvar</button>
                        <button onClick={closeAddMovimentacao}>Fechar</button>
                    </div>
                </div>
            )} */}
        </main>      
    )
}