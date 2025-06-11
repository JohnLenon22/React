import styles from '../modules/Produtos.module.css';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

import { useContext, useState } from 'react';
import { ProdutoContext } from '../contexts/ProdutoContext';
import { CategoriaContext } from '../contexts/CategoriaContext';

export default function Produtos(){
    
    const [isAddProdutoOpen, setIsAddProdutoOpen] = useState(false);
    const {produtos, deletarProduto, adicionarProduto, filtro, setFiltro}  = useContext(ProdutoContext)
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        idCategoria: '',
        precoVenda: '',
        precoCompra: '',
        descricao: ''
    })
    const {categorias} = useContext(CategoriaContext)

    const getNomeCategoria = (idCategoria) => {
        const categoriaEncontrada = categorias.find(cat => String(cat.id || cat.idCategoria) === String(idCategoria));
        return categoriaEncontrada ? `${categoriaEncontrada.nome}`:` Nome não encontrado`;
    };

    const produtosFiltrados = produtos.filter(produto => {
        const filtroLower = filtro.toLowerCase();

        // Garante que todas as propriedades sejam strings e não null/undefined antes de chamar toLowerCase()
        const nome = String(produto.nome || '');
        const idCategoria = String(produto.idCategoria || '');
        const dataCadastro = String(produto.dataCadastro || '');
        const precoVenda = String(produto.precoVenda || '');
        const precoCompra = String(produto.precoCompra || '');
        const descricao = String(produto.descricao || '');

        return (
            nome.toLowerCase().includes(filtroLower) ||
            idCategoria.toLowerCase().includes(filtroLower) ||
            dataCadastro.toLowerCase().includes(filtroLower) ||
            precoVenda.toLowerCase().includes(filtroLower) ||
            precoCompra.toLowerCase().includes(filtroLower) ||
            descricao.toLowerCase().includes(filtroLower)
        );
    });

    const openAddProduto = ( ) => {
        setNovoProduto({
            nome: '',
            idCategoria: '',
            precoCompra: '',
            precoVenda: '',
            descricao: ''
        });
        setIsAddProdutoOpen(true)
    }

    const closeAddProduto = ( ) => {
        setIsAddProdutoOpen(false)
    }

    function handleSalvarProduto() {
        if (!novoProduto.nome || !novoProduto.idCategoria || !novoProduto.precoCompra  || !novoProduto.precoVenda === '' ) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const dadosProduto = {
            ...novoProduto,
            idCategoria: parseInt(novoProduto.idCategoria),
            precoCompra: parseFloat(novoProduto.precoCompra), 
            precoVenda: parseFloat(novoProduto.precoVenda),   
            dataCadastro: new Date().toISOString(),
        };
        console.log("Dados do produto sendo enviados:", dadosProduto);
        adicionarProduto(dadosProduto); 
        closeAddProduto(); 
    };

    function handleDeletarProduto(produto){
        if (window.confirm(`Tem certeza que deseja deletar ${produto.nome}?`)) {
            deletarProduto(produto.id); 
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
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{getNomeCategoria(produto.idCategoria)}</td>
                                <td>{
                                    produto.dataCadastro ? 
                                    new Date(produto.dataCadastro).toLocaleString('pt-BR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true // Formato 24h
                                    })
                                    : 'N/A'
                                    }
                                </td>
                                <td>{parseFloat(produto.precoVenda || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{parseFloat(produto.precoCompra || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.descricao}</td>
                                <button><AiFillEdit/></button>
                                <button onClick={() => handleDeletarProduto(produto)}><AiFillDelete/></button>
                            </tr>
                            
                            ))
                        )
                        : (
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
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novoProduto.nome} onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})} required />
                            <label>Categoria:</label>
                            <input type="number" id="idCategoria" value={novoProduto.idCategoria} onChange={(e) => setNovoProduto({...novoProduto, idCategoria: e.target.value})} required />
                            <label>Preço Compra:</label>
                            <input type="number" step="0.01" value={novoProduto.precoCompra} onChange={(e) => setNovoProduto({...novoProduto, precoCompra: e.target.value})} placeholder="R$ " required />
                            <label>Preço Venda:</label>
                            <input type="number" step="0.01" value={novoProduto.precoVenda} onChange={(e) => setNovoProduto({...novoProduto, precoVenda: e.target.value})} placeholder="R$ " required />
                            <label>Descrição:</label>
                            <input type="text" value={novoProduto.descricao} onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})} required />
                        </form>
                        <button type="button" onClick={handleSalvarProduto}>Salvar</button>
                        <button onClick={closeAddProduto}>Fechar</button>
                    </div>
                </div>
            )}
        </main>      
    )
}