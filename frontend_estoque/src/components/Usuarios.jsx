import styles from '../modules/Produtos.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'


export default function Usuarios(){

    const [isAddUsuarioOpen, setIsAddUsuarioOpen] = useState(false)
    const [isEditUsuarioOpen, setIsEditUsuarioOpen] = useState(false)
    const {usuarios, deletarUsuario, adicionarUsuario, editarUsuario, filtro, setFiltro}  = useContext(UsuarioContext)
    const [novaUsuario, setNovaUsuario] = useState({
        id: null,
        nome: '',
        email: '',
        senhaHash: '',
        tipoUsuario: '',
    })

    const tiposUsuario = [
        { value: 'ADMIN' },
        { value: 'OPERADOR' },
    ];

    const mascararSenha = (senhaHash) => {
    if (!senhaHash || senhaHash.length <= 2) {
        return senhaHash; // Se for menor que 2 caracteres, retorna como está
    }
    const primeiraLetra = senhaHash.charAt(0);
    const ultimaLetra = senhaHash.charAt(senhaHash.length - 1);
    const meio = '*'.repeat(senhaHash.length - 2);
    return `${primeiraLetra}${meio}${ultimaLetra}`;
};

    const usuariosFiltradas = usuarios.filter(usuario => {
        const filtroLower = filtro.toLowerCase();

        const id = String(usuario.id || null);
        const nome = String(usuario.nome || '');
        const email = String(usuario.email || '');
        const senhaHash = String(usuario.senhaHash || '');
        const tipoUsuario = String(usuario.tipoUsuario || '');

        return (
            id.toLowerCase().includes(filtroLower) ||
            nome.toLowerCase().includes(filtroLower) || 
            email.toLowerCase().includes(filtroLower) ||
            senhaHash.toLowerCase().includes(filtroLower) ||
            tipoUsuario.toLowerCase().includes(filtroLower)
        );
    }).sort((a, b) => a.nome - b.nome);

    const openAddUsuario = ( ) => {
        setNovaUsuario({
            id: null,
            nome: '',
            email: '',
            senhaHash: '',
            tipoUsuario: '',
        })
        setIsAddUsuarioOpen(true)
    }
    const closeAddUsuario = ( ) => {
        setIsAddUsuarioOpen(false)
    }

    const openEditUsuario = (usuario) => {
        setNovaUsuario({ 
            id: usuario.id, 
            nome: usuario.nome,
            email: usuario.email,
            senhaHash: usuario.senhaHash,
            tipoUsuario: usuario.tipoUsuario
        });
        setIsEditUsuarioOpen(true)
    }
    const closeEditUsuario = ( ) => {
        setIsEditUsuarioOpen(false)

    }

    const handleSalvarUsuario = () => {

        if((usuarios.some((e) => e.email.trim().toLowerCase() === novaUsuario.email.trim().toLowerCase()))=== true) {
            alert('E-mail já cadastrado')
            return;
        }

        if(novaUsuario.senhaHash.length<8){
            alert('A senha deve ter pelo menos 8 caracteres')
            return;
        }

        adicionarUsuario(novaUsuario)
        setNovaUsuario({
            id: null,
            nome: '',
            email: '',
            senhaHash: '',
            tipoUsuario: '',
        })
        closeAddUsuario()
    }

    const handleDeletarUsuario = (usuario) =>{
        if (window.confirm(`Tem certeza que deseja deletar ${usuario.nome}?`)) {
            deletarUsuario(usuario.id); 
        }
    }

    const handleEditarUsuario = () => {
        if(novaUsuario.senhaHash.length<8){
            alert('A senha deve ter pelo menos 8 caracteres')
            return;
        }
        editarUsuario(novaUsuario.id, {
            nome: novaUsuario.nome, 
            email:novaUsuario.email, 
            senhaHash:novaUsuario.senhaHash, 
            tipoUsuario: novaUsuario.tipoUsuario
        });
        setNovaUsuario({
            id: null,
            nome: '',
            email: '',
            senhaHash: '',
            tipoUsuario: '',
        })
        closeEditUsuario()

    }



    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Usuarios</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        <button className={styles.buttonAdd} onClick={openAddUsuario}>Adicionar Usuario</button>
                    </div>
                    <div className={styles.searchBox}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="text" 
                                placeholder="Buscar por nome,email,tipo..." 
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
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltradas.length > 0 ? (
                            usuariosFiltradas.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{mascararSenha(usuario.senhaHash)}</td>
                                <td>{usuario.tipoUsuario}</td>
                                <td>
                                    <button onClick={() => openEditUsuario(usuario)}><AiFillEdit/></button>
                                    <button onClick={() => handleDeletarUsuario(usuario)}><AiFillDelete/></button>
                                </td>
                            </tr>
                            
                        ))
                        ) : (
                            <tr>
                                <td>Nenhum usuario encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAddUsuarioOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Usuario</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novaUsuario.nome} onChange={(e) => setNovaUsuario({...novaUsuario, nome: e.target.value})} required/>
                             <label>Email:</label>
                            <input type="text" id="nome" value={novaUsuario.email} onChange={(e) => setNovaUsuario({...novaUsuario, email: e.target.value})} required/>
                             <label>Senha:</label>
                            <input type="text" id="nome" value={novaUsuario.senhaHash} onChange={(e) => setNovaUsuario({...novaUsuario, senhaHash: e.target.value})} required/>

                            <label>Tipo:</label>
                            <select id="nome" value={novaUsuario.tipoUsuario} onChange={(e) => setNovaUsuario({...novaUsuario, tipoUsuario: e.target.value})} required>
                                <option value="">Selecione um tipo de Usuario</option>
                                {tiposUsuario.map((tipo)=>(
                                    <option key={tipo.value} value={tipo.value}>
                                        {tipo.value}
                                    </option>
                                ))

                                }
                            </select>
                        </form>
                        <button type="submit" className={styles.buttonAdd} onClick={handleSalvarUsuario}>Salvar</button>
                        <button className={styles.buttonDel} onClick={closeAddUsuario}>Fechar</button>
                    </div>
                </div>
            )}
            {isEditUsuarioOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Editar Usuario</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Nome:</label>
                            <input type="text" id="nome" value={novaUsuario.nome} onChange={(e) => setNovaUsuario({...novaUsuario, nome: e.target.value})} required/>
                             <label>Email:</label>
                            <input type="text" id="nome" value={novaUsuario.email} onChange={(e) => setNovaUsuario({...novaUsuario, email: e.target.value})} required/>
                             <label>Senha:</label>
                            <input type="text" id="nome" value={novaUsuario.senhaHash} onChange={(e) => setNovaUsuario({...novaUsuario, senhaHash: e.target.value})} required/>

                            <label>Tipo:</label>
                            <select id="nome" value={novaUsuario.tipoUsuario} onChange={(e) => setNovaUsuario({...novaUsuario, tipoUsuario: e.target.value})} required>
                                <option value="">Selecione um tipo de Usuario</option>
                                {tiposUsuario.map((tipo)=>(
                                    <option key={tipo.value} value={tipo.value}>
                                        {tipo.value}
                                    </option>
                                ))

                                }
                            </select>
                        </form>
                        <button type="submit" onClick={handleEditarUsuario}>Salvar</button>
                        <button onClick={closeEditUsuario}>Fechar</button>
                    </div>
                </div>

            )}

        </main>
    )
}