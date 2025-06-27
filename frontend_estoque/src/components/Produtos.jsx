import styles from '../modules/Produtos.module.css';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react';
import { ProdutoContext } from '../contexts/ProdutoContext';
import { CategoriaContext } from '../contexts/CategoriaContext';

export default function Produtos(){
    
    const [isAddProdutoOpen, setIsAddProdutoOpen] = useState(false);
    const [isEditProdutoOpen, setIsEditProdutoOpen] = useState(false);
    const {produtos, deletarProduto, adicionarProduto, editarProduto, filtro, setFiltro}  = useContext(ProdutoContext)
    const [novoProduto, setNovoProduto] = useState({
        id: '',
        nome: '',
        idCategoria: '',
        precoVenda: '',
        precoCompra: '',
        descricao: '',
        quantidade: '',
    })
    const {categorias} = useContext(CategoriaContext)

    const getNomeCategoria = (idCategoria) => {
        const categoriaEncontrada = categorias.find(cat => String(cat.id || cat.idCategoria) === String(idCategoria));
        return categoriaEncontrada ? `${categoriaEncontrada.nome}`:` Nome não encontrado`;
    };

    const produtosFiltrados = produtos.filter(produto => {
        const filtroLower = filtro.toLowerCase();

        const nome = String(produto.nome || '');
        const idCategoria = String(produto.idCategoria || '');
        const dataCadastro = String(produto.dataCadastro || '');
        const precoVenda = String(produto.precoVenda || '');
        const precoCompra = String(produto.precoCompra || '');
        const descricao = String(produto.descricao || '');
        const quantidade = String(produto.quantidade || '');

        return (
            nome.toLowerCase().includes(filtroLower) ||
            idCategoria.toLowerCase().includes(filtroLower) ||
            dataCadastro.toLowerCase().includes(filtroLower) ||
            precoVenda.toLowerCase().includes(filtroLower) ||
            precoCompra.toLowerCase().includes(filtroLower) ||
            descricao.toLowerCase().includes(filtroLower) ||
            quantidade.toLowerCase().includes(filtroLower) 
        );
    }).sort((a, b) => a.nome.localeCompare(b.nome));


    const openAddProduto = ( ) => {
        setNovoProduto({
            id: null,
            nome: '',
            idCategoria: '',
            precoCompra: '',
            precoVenda: '',
            descricao: '',
            quantidade: '',
        });
        setIsAddProdutoOpen(true)
    }

    const closeAddProduto = ( ) => {
        setIsAddProdutoOpen(false)
    }

    const openEditProduto = (produto) => {
        setNovoProduto({
            id: produto.id, 
            nome: produto.nome,
            idCategoria: produto.idCategoria,
            dataCadastro: produto.dataCadastro,
            precoCompra: produto.precoCompra,
            precoVenda: produto.precoVenda,
            descricao: produto.descricao,
            quantidade: produto.quantidade
        })
        setIsEditProdutoOpen(true)
    }

    const closeEditProduto = () => {
        setIsEditProdutoOpen(false)
    }

    function handleSalvarProduto() {
        if (!novoProduto.nome || !novoProduto.idCategoria || !novoProduto.precoCompra  || !novoProduto.precoVenda === '' ) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        if(novoProduto.precoCompra >= novoProduto.precoVenda){
            alert('O preço de venda não pode ser menor ou igual ao preço de compra!');
            return;
        }
        if(novoProduto.quantidade<0){
            alert('A quantidade não pode ser negativa!');
            return;
        }

        const dadosProduto = {
            ...novoProduto,
            idCategoria: parseInt(novoProduto.idCategoria),
            precoCompra: parseFloat(novoProduto.precoCompra), 
            precoVenda: parseFloat(novoProduto.precoVenda),   
            dataCadastro: new Date().toISOString(),
            quantidade: parseInt(novoProduto.quantidade) || 0, 
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

    function handleEditarProduto(){
        if (!novoProduto.nome || !novoProduto.idCategoria || !novoProduto.precoCompra  || !novoProduto.precoVenda === '' ) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if(novoProduto.precoCompra >= novoProduto.precoVenda){
            alert('O preço de venda não pode ser menor ou igual ao preço de compra!');
            return;
        }

        const dadosProduto = {
            ...novoProduto,
            idCategoria: parseInt(novoProduto.idCategoria),
            precoCompra: parseFloat(novoProduto.precoCompra), 
            precoVenda: parseFloat(novoProduto.precoVenda),   
            dataCadastro: new Date().toISOString(),
            quantidade: parseInt(novoProduto.quantidade) || 0, 

        }; 
        editarProduto(dadosProduto.id, {
            nome: dadosProduto.nome,
            idCategoria: dadosProduto.idCategoria,
            dataCadastro: dadosProduto.dataCadastro,
            precoCompra: dadosProduto.precoCompra,
            precoVenda: dadosProduto.precoVenda,
            descricao: dadosProduto.descricao,
            quantidade: dadosProduto.quantidade
        });
       
        closeEditProduto();
        
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
                                placeholder="Buscar por nome ou categoria" 
                                value={filtro}
                                onChange={(e)=> setFiltro(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Data Cadastro</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Quantidade</th>
                            <th>Preço Compra</th>
                            <th>Preço Venda</th>
                            <th>Descricao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map((produto) => (

                            <tr key={produto.id || produto.nome || produto.dataCadastro || produto.precoCompra || produto.precoVenda}>
                                <td>{produto.dataCadastro ? 
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
                                <td>{produto.nome}</td>
                                <td>{getNomeCategoria(produto.idCategoria)}</td>
                                <td>{produto.quantidade}</td>
                                <td>{parseFloat(produto.precoCompra || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{parseFloat(produto.precoVenda || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.descricao}</td>
                                <td>
                                    <button onClick={() => openEditProduto(produto)}><AiFillEdit/></button>
                                    <button onClick={() => handleDeletarProduto(produto)}><AiFillDelete/></button>
                                </td>
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
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Produto</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome</label>
                            <input type="text" id="nome" value={novoProduto.nome} onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})} required />
                            <label>Categoria</label>
                            <select id="idCategoria" value={novoProduto.idCategoria} onChange={(e) => setNovoProduto({...novoProduto, idCategoria: e.target.value})} required>
                                <option>Selecione uma categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>

                            <label>Quantidade</label>
                            <input type="number" step="1" value={novoProduto.quantidade} onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})} required />
                
                            <label>Preço Compra</label>
                            <input type="number" step="0.01" value={novoProduto.precoCompra} onChange={(e) => setNovoProduto({...novoProduto, precoCompra: e.target.value})} placeholder="R$ " required />
                            <label>Preço Venda</label>
                            <input type="number" step="0.01" value={novoProduto.precoVenda} onChange={(e) => setNovoProduto({...novoProduto, precoVenda: e.target.value})} placeholder="R$ " required />
                            <label>Descrição</label>
                            <input type="text" value={novoProduto.descricao} onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})}  />
                        </form>
                        <button type="submit" className={styles.buttonAdd} onClick={handleSalvarProduto}>Salvar</button>
                        <button onClick={closeAddProduto} >Fechar</button>
                    </div>
                </div>
            )}
            {isEditProdutoOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Editar Produto</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novoProduto.nome} onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})} required />
                            <label>Categoria:</label>
                            <select id="idCategoria" value={novoProduto.idCategoria} onChange={(e) => setNovoProduto({...novoProduto, idCategoria: e.target.value})} required>
                                <option>Selecione uma categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>

                            <label>Quantidade</label>
                            <input type="number" step="1" value={novoProduto.quantidade} onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})} required />
                            
                            <label>Preço Compra:</label>
                            <input type="number" step="0.01" value={novoProduto.precoCompra} onChange={(e) => setNovoProduto({...novoProduto, precoCompra: e.target.value})} placeholder="R$ " required />
                            <label>Preço Venda:</label>
                            <input type="number" step="0.01" value={novoProduto.precoVenda} onChange={(e) => setNovoProduto({...novoProduto, precoVenda: e.target.value})} placeholder="R$ " required />
                            <label>Descrição:</label>
                            <input type="text" value={novoProduto.descricao} onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})}  />
                        </form>
                        <button type="submit" className={styles.buttonAdd} onClick={handleEditarProduto}>Salvar</button>
                        <button onClick={closeEditProduto}>Fechar</button>
                    </div>
                </div>
            )}
        </main>      
    )
}