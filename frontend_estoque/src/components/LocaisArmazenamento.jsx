import styles from '../modules/LocaisArmazenamento.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react'
import { LocalArmazenamentoContext } from '../contexts/LocalArmazenamentoContext'

export default function LocaisArmazenamento(){

    const [isAddLocalArmazenamentoOpen, setIsAddLocalArmazenamentoOpen] = useState(false)
    const [isEditLocalArmazenamentoOpen, setIsEditLocalArmazenamentoOpen] = useState(false)
    const {locaisArmazenamento, deletarLocalArmazenamento, adicionarLocalArmazenamento, editarLocalArmazenamento, filtro, setFiltro}  = useContext(LocalArmazenamentoContext)
    const [novoLocalArmazenamento, setNovoLocalArmazenamento] = useState({
        id: '',
        nome: '',
        endereco: '',
        responsavel:'',

    })


    const locaisArmazenamentoFiltrados = locaisArmazenamento.filter(localArmazenamento => {
        const filtroLower = filtro.toLowerCase();

        const id = String(localArmazenamento.id || '');
        const nome = String(localArmazenamento.nome || '');
        const endereco = String(localArmazenamento.endereco || '');
        const responsavel = String(localArmazenamento.responsavel || '');

        return (
            id.toLowerCase().includes(filtroLower) ||
            nome.toLowerCase().includes(filtroLower) ||
            endereco.toLowerCase().includes(filtroLower) ||
            responsavel.toLowerCase().includes(filtroLower) 
        );
    }).sort((a, b) => a.id - b.id);

    const openAddLocalArmazenamento = ( ) => {
        setNovoLocalArmazenamento({
            nome: '',
            endereco: '',
            responsavel: ''
        });
        setIsAddLocalArmazenamentoOpen(true)
    }
    const closeAddLocalArmazenamento = ( ) => {
        setIsAddLocalArmazenamentoOpen(false)
    }

    const openEditLocalArmazenamento = (localArmazenamento) => {
        setNovoLocalArmazenamento({
            id: localArmazenamento.id,
            nome: localArmazenamento.nome,
            endereco: localArmazenamento.endereco,
            responsavel: localArmazenamento.responsavel
        });
        setIsEditLocalArmazenamentoOpen(true)
    }
    const closeEditLocalArmazenamento = ( ) => {
        setIsEditLocalArmazenamentoOpen(false)
    }

    function handleSalvarLocalArmazenamento( ){
        if (novoLocalArmazenamento.id === '' || novoLocalArmazenamento.endereco === '' || novoLocalArmazenamento.responsavel === '') {
            alert('Preencha todos os campos!')
            return
        }
        adicionarLocalArmazenamento(novoLocalArmazenamento); 
        setNovoLocalArmazenamento({nome: '',endereco: '',responsavel: ''})
        closeAddLocalArmazenamento(); 
    }

    function handleDeleteLocalArmazenamento(localArmazenamento){
        if (window.confirm(`Tem certeza que deseja deletar ${localArmazenamento.nome}?`)) {
            deletarLocalArmazenamento(localArmazenamento.id); 
        }
    }

    function handleEditarLocalArmazenamento(){
        editarLocalArmazenamento(novoLocalArmazenamento.id, {
            nome: novoLocalArmazenamento.nome,
            endereco: novoLocalArmazenamento.endereco,
            responsavel: novoLocalArmazenamento.responsavel
        })
        setNovoLocalArmazenamento({
            id: '',
            nome: '',
            endereco: '',
            responsavel: ''
        })
        closeEditLocalArmazenamento()

    }

    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Locais Armezenamento</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        <button className={styles.buttonAdd} onClick={openAddLocalArmazenamento}>Adicionar Local Armazenamento</button>
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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereco</th>
                            <th>Responsavel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locaisArmazenamentoFiltrados.length > 0 ? (
                            locaisArmazenamentoFiltrados.map((localArmazenamento) => (
                            <tr key={localArmazenamento.id}>
                                <td>{localArmazenamento.id}</td>
                                <td>{localArmazenamento.nome}</td>
                                <td>{localArmazenamento.endereco}</td>
                                <td>{localArmazenamento.responsavel}</td>
                                <td>
                                    <button onClick={() => openEditLocalArmazenamento(localArmazenamento)}><AiFillEdit/></button>
                                    <button onClick={() => handleDeleteLocalArmazenamento(localArmazenamento)}><AiFillDelete/></button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhuma local armazenamento encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAddLocalArmazenamentoOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Local Armazenamento</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novoLocalArmazenamento.nome} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, nome: e.target.value})} required />
                            <label>Endereço:</label>
                            <input type="text" id="endereco" value={novoLocalArmazenamento.endereco} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, endereco: e.target.value})} required />
                            <label>Responsável:</label>
                            <input type="text" id="responsavel" value={novoLocalArmazenamento.responsavel} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, responsavel: e.target.value})} required />
                        </form>
                        <button type="submit" onClick={handleSalvarLocalArmazenamento}>Salvar</button>
                        <button onClick={closeAddLocalArmazenamento}>Fechar</button>
                    </div>
                </div>
            )}
            {isEditLocalArmazenamentoOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Editar Local Armazenamento</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novoLocalArmazenamento.nome} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, nome: e.target.value})} required />
                            <label>Endereço:</label>
                            <input type="text" id="endereco" value={novoLocalArmazenamento.endereco} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, endereco: e.target.value})} required />
                            <label>Responsável:</label>
                            <input type="text" id="responsavel" value={novoLocalArmazenamento.responsavel} onChange={(e) => setNovoLocalArmazenamento({...novoLocalArmazenamento, responsavel: e.target.value})} required />
                        </form>
                        <button type="submit" onClick={handleEditarLocalArmazenamento}>Salvar</button>
                        <button onClick={closeEditLocalArmazenamento}>Fechar</button>
                    </div>
                </div>
            )}
        </main>
    )
}
