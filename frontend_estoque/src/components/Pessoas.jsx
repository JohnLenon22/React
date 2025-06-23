import styles from '../modules/LocaisArmazenamento.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react'
import { PessoaContext } from '../contexts/PessoaContext'


export default function Pessoas(){

    const [isAddPessoaOpen, setIsAddPessoaOpen] = useState(false)
    const [isEditPessoaOpen, setIsEditPessoaOpen] = useState(false)
    const {pessoas, deletarPessoa, adicionarPessoa, editarPessoa, filtro, setFiltro}  = useContext(PessoaContext)
    const [novaPessoa, setNovaPessoa] = useState({
        id: null,
        nome: '',
        tipoPessoa: '',
    })

    const tiposPessoa = [
        { value: 'CLIENTE' },
        { value: 'FORNECEDOR' },
    ];


    const pessoasFiltradas = pessoas.filter(pessoa => {
        const filtroLower = filtro.toLowerCase();

        const id = String(pessoa.id || null);
        const nome = String(pessoa.nome || '');
        const tipoPessoa = String(pessoa.tipoPessoa || '');

        return (
            id.toLowerCase().includes(filtroLower) ||
            nome.toLowerCase().includes(filtroLower) || 
            tipoPessoa.toLowerCase().includes(filtroLower)
        );
    }).sort((a, b) => a.nome - b.nome);

    const openAddPessoa = ( ) => {
        setNovaPessoa({
            id: null,
            nome: '',
            tipoPessoa: '',
        })
        setIsAddPessoaOpen(true)
    }
    const closeAddPessoa = ( ) => {
        setIsAddPessoaOpen(false)
    }

    const openEditPessoa = (pessoa) => {
        setNovaPessoa({ id: pessoa.id, nome: pessoa.nome });
        setIsEditPessoaOpen(true)
    }
    const closeEditPessoa = ( ) => {
        setIsEditPessoaOpen(false)

    }

    const handleSalvarPessoa = () => {
        if(novaPessoa.nome.trim() === '' || novaPessoa.tipoPessoa.trim() === '') {
            alert('Preencha todos os campos')
            return;
        }
        adicionarPessoa(novaPessoa)
        setNovaPessoa({id: null, nome: '', tipoPessoa: ''})
        closeAddPessoa()
    }

    const handleDeletarPessoa = (pessoa) =>{
        if (window.confirm(`Tem certeza que deseja deletar ${pessoa.nome}?`)) {
            deletarPessoa(pessoa.id); 
        }
    }

    const handleEditarPessoa = () => {
        if(novaPessoa.nome.trim() === '' || novaPessoa.tipoPessoa.trim() === '') {
            alert('Preencha todos os campos')
            return;
        }
        editarPessoa(novaPessoa.id, {nome: novaPessoa.nome, tipoPessoa: novaPessoa.tipoPessoa});
        setNovaPessoa({id: null, nome: '', tipoPessoa: ''})
        closeEditPessoa()

    }



    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Pessoas</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        <button className={styles.buttonAdd} onClick={openAddPessoa}>Adicionar Pessoa</button>
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
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoasFiltradas.length > 0 ? (
                            pessoasFiltradas.map((pessoa) => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.tipoPessoa}</td>
                                <td>
                                    <button onClick={() => openEditPessoa(pessoa)}><AiFillEdit/></button>
                                    <button onClick={() => handleDeletarPessoa(pessoa)}><AiFillDelete/></button>
                                </td>
                            </tr>
                            
                        ))
                        ) : (
                            <tr>
                                <td>Nenhuma pessoa encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAddPessoaOpen && (
                <div className={styles.addPessoaModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar pessoa</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novaPessoa.nome} onChange={(e) => setNovaPessoa({...novaPessoa, nome: e.target.value})} required/>

                            <label>Tipo:</label>
                            <select id="nome" value={novaPessoa.tipoPessoa} onChange={(e) => setNovaPessoa({...novaPessoa, tipoPessoa: e.target.value})} required>
                                <option value="">Selecione um tipo de pessoa</option>
                                {tiposPessoa.map((tipo)=>(
                                    <option key={tipo.id} value={tipo.value}>
                                        {tipo.value}
                                    </option>
                                ))

                                }
                            </select>
                        </form>
                        <button type="submit" className={styles.buttonAdd} onClick={handleSalvarPessoa}>Salvar</button>
                        <button className={styles.buttonDel} onClick={closeAddPessoa}>Fechar</button>
                    </div>
                </div>
            )}
            {isEditPessoaOpen && (
                <div className={styles.addPessoaModal}>
                    <div className={styles.modalContent}>
                        <h2>Editar Pessoa</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novaPessoa.nome} onChange={(e) => setNovaPessoa({...novaPessoa, nome: e.target.value})} required/>

                            <label>Tipo:</label>
                            <select id="nome" value={novaPessoa.tipoPessoa} onChange={(e) => setNovaPessoa({...novaPessoa, tipoPessoa: e.target.value})} required>
                                <option value="">Selecione um tipo de pessoa</option>
                                {tiposPessoa.map((tipo)=>(
                                    <option key={tipo.id} value={tipo.value}>
                                        {tipo.value}
                                    </option>
                                ))

                                }
                            </select>
                        </form>
                        <button type="submit" onClick={handleEditarPessoa}>Salvar</button>
                        <button onClick={closeEditPessoa}>Fechar</button>
                    </div>
                </div>

            )}

        </main>
    )
}