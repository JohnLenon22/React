import styles from '../modules/LocaisArmazenamento.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react'
import { MovimentacaoEstoqueContext } from '../contexts/MovimentacaoEstoqueContext'
import { LocalArmazenamentoContext } from '../contexts/LocalArmazenamentoContext'
import { ProdutoContext } from '../contexts/ProdutoContext'
import { PessoaContext } from '../contexts/PessoaContext'
import { UsuarioContext } from '../contexts/UsuarioContext';

export default function MovimentacoesEstoque(){

    const [isAddMovimentacaoEstoqueOpen, setIsAddMovimentacaoEstoqueOpen] = useState(false)
    const [isEditMovimentacaoEstoqueOpen, setIsEditMovimentacaoEstoqueOpen] = useState(false)
    const {movimentacoesEstoque, deletarMovimentacaoEstoque, adicionarMovimentacaoEstoque, editarMovimentacaoEstoque, filtro, setFiltro}  = useContext(MovimentacaoEstoqueContext)
    const [novaMovimentacaoEstoque, setNovaMovimentacaoEstoque] = useState({
        id: '',
        tipoMovimentacao: '',
        quantidade: '',
        idProduto: '',
        idUsuario: '',
        idPessoa: '',
        idLocalArmazenamento: '',

    })
    const {locaisArmazenamento} = useContext(LocalArmazenamentoContext)
    const {produtos} = useContext(ProdutoContext)
    const {pessoas} = useContext(PessoaContext)
    const {usuarios} = useContext(UsuarioContext)

    const getNomeLocal = (idLocalArmazenamento) => {
        const local = locaisArmazenamento.find(localArmazenamento =>localArmazenamento.id === idLocalArmazenamento)
        return local ? local.nome : ''
    }

    const getNomeProduto = (idProduto) => {
        const produto = produtos.find(produto =>produto.id === idProduto)
        return produto ? produto.nome : ''
    }

    const getNomePessoa = (idPessoa) => {
        const pessoa = pessoas.find(pessoa => pessoa.id === idPessoa)
        return pessoa ? pessoa.nome : ''
    }

    const getNomeUsuario = (idUsuario) => {
        const usuario = usuarios.find(usuario => usuario.id === idUsuario)
        return usuario ? usuario.nome : ''
    }

    const tiposMovimentacao = [
        { value: 'ENTRADA' },
        { value: 'TRANSFERENCIA' },
        { value: 'SAIDA' },
    ];
    

    const movimentacoesEstoqueFiltradas = movimentacoesEstoque.filter(movimentacao => {
        const filtroLower = filtro.toLowerCase();

        const id = String(movimentacao.id || '');
        const tipoMovimentacao = String(movimentacao.tipoMovimentacao || '');
        const quantidade = String(movimentacao.quantidade || '');
        const idProduto = String(movimentacao.idProduto || '');
        const idUsuario = String(movimentacao.idUsuario || '');
        const idPessoa = String(movimentacao.idPessoa || '');
        const idLocalArmazenamento = String(movimentacao.idLocalArmazenamento || '')


        return (
            id.toLowerCase().includes(filtroLower) ||
            tipoMovimentacao.toLowerCase().includes(filtroLower) ||
            quantidade.toLowerCase().includes(filtroLower) ||
            idProduto.toLowerCase().includes(filtroLower) ||
            idUsuario.toLowerCase().includes(filtroLower) ||
            idPessoa.toLowerCase().includes(filtroLower) ||
            idLocalArmazenamento.toLowerCase().includes(filtroLower)
        );
    }).sort((a, b) => a.tipoMovimentacao - b.tipoMovimentacao);

    const openAddMovimentacaoEstoque = ( ) => {
        setNovaMovimentacaoEstoque({
            id: '',
            tipoMovimentacao: '',
            quantidade: '',
            idProduto: '',
            idUsuario: '',
            idPessoa: '',
            idLocalArmazenamento: '',
        });
        setIsAddMovimentacaoEstoqueOpen(true)
    }
    const closeAddMovimentacaoEstoque = ( ) => {
        setIsAddMovimentacaoEstoqueOpen(false)
    }

    const openEditMovimentacaoEstoque = (movimentacaoEstoque) => {
        setNovaMovimentacaoEstoque({
            id: movimentacaoEstoque.id,
            tipoMovimentacao: movimentacaoEstoque.tipoMovimentacao,
            quantidade: movimentacaoEstoque.quantidade,
            idProduto: movimentacaoEstoque.idProduto,
            idUsuario: movimentacaoEstoque.idUsuario,
            idPessoa: movimentacaoEstoque.idPessoa,
            idLocalArmazenamento: movimentacaoEstoque.idLocalArmazenamento,
        });
        setIsEditMovimentacaoEstoqueOpen(true)
    }
    const closeEditMovimentacaoEstoque = ( ) => {
        setIsEditMovimentacaoEstoqueOpen(false)
    }

    function handleSalvarMovimentacaoEstoque( ){
        console.log(novaMovimentacaoEstoque)
        if (novaMovimentacaoEstoque.tipoMovimentacao === '' || novaMovimentacaoEstoque.quantidade === '' || novaMovimentacaoEstoque.idProduto === '' || novaMovimentacaoEstoque.idUsuario === '' || novaMovimentacaoEstoque.idPessoa === '' || novaMovimentacaoEstoque.idLocalArmazenamento === '') {
            alert('Preencha todos os campos!')
            return
        }
        adicionarMovimentacaoEstoque(novaMovimentacaoEstoque); 
        setNovaMovimentacaoEstoque({
            id: '',
            tipoMovimentacao: '',
            quantidade: '',
            idProduto: '',
            idUsuario: '',
            idPessoa: '',
            idLocalArmazenamento: '',
        })
        closeAddMovimentacaoEstoque(); 
    }

    function handleDeleteMovimentacaoEstoque(movimentacaoEstoque){
        if (window.confirm(`Tem certeza que deseja deletar ?`)) {
            deletarMovimentacaoEstoque(movimentacaoEstoque.id); 
        }
    }

    function handleEditarMovimentacaoEstoque(){
        editarMovimentacaoEstoque(novaMovimentacaoEstoque.id, {
            tipoMovimentacao: novaMovimentacaoEstoque.tipoMovimentacao,
            quantidade: novaMovimentacaoEstoque.quantidade,
            idProduto: novaMovimentacaoEstoque.idProduto,
            idUsuario: novaMovimentacaoEstoque.idUsuario,
            idPessoa: novaMovimentacaoEstoque.idPessoa,
            idLocalArmazenamento: novaMovimentacaoEstoque.idLocalArmazenamento
        })
        setNovaMovimentacaoEstoque({
            id: '',
            tipoMovimentacao: '',
            quantidade: '',
            idProduto: '',
            idUsuario: '',
            idPessoa: '',
            idLocalArmazenamento: '',
        })
        closeEditMovimentacaoEstoque()

    }

    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Locais Armezenamento</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        <button className={styles.buttonAdd} onClick={openAddMovimentacaoEstoque}>Realizar Movimentação Estoque</button>
                    </div>
                    <div className={styles.searchBox}>
                        <form onSubmit={(e) => e.preventDefault()}>
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
                            <th>Produto</th>
                            <th>Usuário</th>
                            <th>Pessoa</th>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimentacoesEstoqueFiltradas.length > 0 ? (
                            movimentacoesEstoqueFiltradas.map((movimentacaoEstoque) => (
                            <tr key={movimentacaoEstoque.id || movimentacaoEstoque.tipoMovimentacao}>
                                <td>{getNomeProduto(movimentacaoEstoque.idProduto)}</td>
                                <td>{getNomeUsuario(movimentacaoEstoque.idUsuario)}</td>
                                <td>{getNomePessoa(movimentacaoEstoque.idPessoa)}</td>
                                <td>{movimentacaoEstoque.tipoMovimentacao}</td>
                                <td>{movimentacaoEstoque.quantidade}</td>
                                <td>{getNomeLocal(movimentacaoEstoque.idLocalArmazenamento)}</td>
                                <td>
                                    <button onClick={() => openEditMovimentacaoEstoque(movimentacaoEstoque)}><AiFillEdit/></button>
                                    <button onClick={() => handleDeleteMovimentacaoEstoque(movimentacaoEstoque)}><AiFillDelete/></button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhuma movimentacão estoque encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAddMovimentacaoEstoqueOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Movimentação Estoque</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Produto:</label>
                            <select id="idProduto" value={novaMovimentacaoEstoque.idProduto} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idProduto: e.target.value})} required>
                                
                                <option value="">Selecione um produto</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>

                            <label>Usuário:</label>
                            <select id="idUsuario" value={novaMovimentacaoEstoque.idUsuario} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idUsuario: e.target.value})} required>
                                
                                <option value="">Selecione um usuário</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nome}  |  {usuario.email}
                                    </option> 
                                ))}
                            </select>
                           

                            <label>Pessoa:</label>
                            <select id="idPessoa" value={novaMovimentacaoEstoque.idPessoa} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idPessoa: e.target.value})} required>
                                <option value="">Selecione um usuário</option>
                                {pessoas.map((pessoa) => (
                                    <option key={pessoa.id} value={pessoa.id}>
                                        {pessoa.nome}  |  {pessoa.tipoPessoa}
                                    </option> 
                                ))}
                            </select>
                                
                            <label>Tipo:</label>
                            <select id="tipoMovimentacao" value={novaMovimentacaoEstoque.tipoMovimentacao} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, tipoMovimentacao: e.target.value})} required>
                                <option value="">Selecione um local</option>
                                {tiposMovimentacao.map((tipo) => (
                                    <option key={tipo.id} value={tipo.value}>
                                        {tipo.value} 
                                    </option> 
                                ))}
                            </select> 
                            
                            <label>Quantidade:</label>
                            <input type="number" id="quantidade" value={novaMovimentacaoEstoque.quantidade} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, quantidade: e.target.value})} required />
                            
                            <label>ID Local Armazenamento:</label>
                            <select id="idLocalArmazenamento" value={novaMovimentacaoEstoque.idLocalArmazenamento} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idLocalArmazenamento: e.target.value})} required>
                                <option value="">Selecione um local</option>
                                {locaisArmazenamento.map((local) => (
                                    <option key={local.id} value={local.id}>
                                        {local.nome}  |  {local.endereco}
                                    </option> 
                                ))}
                            </select> 
                        
                        </form>
                        <button type="submit" onClick={handleSalvarMovimentacaoEstoque}>Salvar</button>
                        <button onClick={closeAddMovimentacaoEstoque}>Fechar</button>
                    </div>
                </div>
            )}
            {isEditMovimentacaoEstoqueOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Editar Local Armazenamento</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Produto:</label>
                            <select id="idProduto" value={novaMovimentacaoEstoque.idProduto} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idProduto: e.target.value})} required>
                                
                                <option value="">Selecione um produto</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>

                            <label>Usuário:</label>
                            <select id="idUsuario" value={novaMovimentacaoEstoque.idUsuario} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idUsuario: e.target.value})} required>
                                
                                <option value="">Selecione um usuário</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nome}  |  {usuario.email}
                                    </option> 
                                ))}
                            </select>
                           

                            <label>Pessoa:</label>
                            <select id="idPessoa" value={novaMovimentacaoEstoque.idPessoa} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idPessoa: e.target.value})} required>
                                <option value="">Selecione um usuário</option>
                                {pessoas.map((pessoa) => (
                                    <option key={pessoa.id} value={pessoa.id}>
                                        {pessoa.nome}  |  {pessoa.tipoPessoa}
                                    </option> 
                                ))}
                            </select>
                                
                            <label>Tipo:</label>
                            <select id="tipoMovimentacao" value={novaMovimentacaoEstoque.tipoMovimentacao} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, tipoMovimentacao: e.target.value})} required>
                                <option value="">Selecione um local</option>
                                {tiposMovimentacao.map((tipo) => (
                                    <option key={tipo.id} value={tipo.value}>
                                        {tipo.value} 
                                    </option> 
                                ))}
                            </select> 
                            
                            <label>Quantidade:</label>
                            <input type="number" id="quantidade" value={novaMovimentacaoEstoque.quantidade} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, quantidade: e.target.value})} required />
                            
                            <label>ID Local Armazenamento:</label>
                            <select id="idLocalArmazenamento" value={novaMovimentacaoEstoque.idLocalArmazenamento} onChange={(e) => setNovaMovimentacaoEstoque({...novaMovimentacaoEstoque, idLocalArmazenamento: e.target.value})} required>
                                <option value="">Selecione um local</option>
                                {locaisArmazenamento.map((local) => (
                                    <option key={local.id} value={local.id}>
                                        {local.nome}  |  {local.endereco}
                                    </option> 
                                ))}
                            </select> 
                        
                        </form>
                        <button type="submit" onClick={handleEditarMovimentacaoEstoque}>Salvar</button>
                        <button onClick={closeEditMovimentacaoEstoque}>Fechar</button>
                    </div>
                </div>
            )}
        </main>
    )
}
