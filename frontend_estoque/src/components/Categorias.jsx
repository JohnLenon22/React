import styles from '../modules/Categorias.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react'
import { CategoriaContext } from '../contexts/CategoriaContext'


export default function Categorias(){

    const [isAddCategoriaOpen, setIsAddCategoriaOpen] = useState(false)
    const {categorias, deletarCategoria,adicionarCategoria , filtro, setFiltro}  = useContext(CategoriaContext)
    const [novaCategoria, setNovaCategoria] = useState({
        nome: '' 
    })


    const categoriasFiltradas = categorias.filter(categoria => {
        const filtroLower = filtro.toLowerCase();

        const id = String(categoria.idCategoria || '');
        const nome = String(categoria.nome || '');

        return (
            id.toLowerCase().includes(filtroLower) ||
            nome.toLowerCase().includes(filtroLower)
        );
    });

    const openAddCategoria = ( ) => {
        setIsAddCategoriaOpen(true)
    }
    const closeAddCategoria = ( ) => {
        setIsAddCategoriaOpen(false)
    }

    function handleSalvarCategoria(){
        if(!novaCategoria.nome || novaCategoria.nome.trim() === '') {
            alert('Preencha o campo nome')
            return;
        }
        adicionarCategoria(novaCategoria)
        setNovaCategoria({nome: ''})
        closeAddCategoria()
    }

    function handleDeletarCategoria(categoria){
        if (window.confirm(`Tem certeza que deseja deletar ${categoria.nome}?`)) {
            deletarCategoria(categoria.id); 
        }
    }



    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Categorias</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        <button className={styles.buttonAdd} onClick={openAddCategoria}>Adicionar Categoria</button>
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
                            <th className={styles.thID}>ID</th>
                            <th className={styles.thNOME}>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriasFiltradas.length > 0 ? (
                            categoriasFiltradas.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nome}</td>
                                <button><AiFillEdit/></button>
                                <button onClick={() => handleDeletarCategoria(categoria)}><AiFillDelete/></button>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhuma categoria encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAddCategoriaOpen && (
                <div className={styles.addCategoriaModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Categoria</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novaCategoria.nome} onChange={(e) => setNovaCategoria({...novaCategoria, nome: e.target.value})} required />
                        </form>
                        <button type="submit" onClick={handleSalvarCategoria} >Salvar</button>
                        <button onClick={closeAddCategoria}>Fechar</button>
                    </div>
                </div>
            )};

        </main>
    )
}