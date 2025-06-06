import styles from '../modules/LocaisArmazenamento.module.css'

export default function LocaisArmazenamento(){

    // const [isAddLocalOpen, setIsAddLocalOpen] = useState(false)
    // const {locais, deletarLocal, filtro, setFiltro}  = useContext(LocalContext)
    // const [novoLocal, setNovoLocal] = useState({
    //     nome: '',
    //     endereco: '',
    //     responsavel:'',

    // })

    // const locaisFiltrados = locais.filter(local =>
    //     local.id.toLowerCase().includes(filtro.toLowerCase()) ||
    //     local.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    //     local.endereco.toLowerCase().includes(filtro.toLowerCase()) ||
    //     local.responsavel.toLowerCase().includes(filtro.toLowerCase()) 
    // )

    // const openAddLocal = ( ) => {
    //     setNovoLocal({
    //         nome: '',
    //         endereco: '',
    //         responsavel: ''
    //     });
    //     setIsAddLocalOpen(true)
    // }
    // const closeAddLocal = ( ) => {
    //     setIsAddLocalOpen(false)
    // }

    // const handleSalvarLocal = ( ) => {
    //     if (local.id === '' || local.endereco === '' || local.responsavel === '') {
    //         alert('Preencha todos os campos!')
    //         return
    //     }
    //     adicionarLocal(novoLocal); 
    //     closeAddProduto(); 
    // }

    return(
        <main className={styles.main}>
            <div className={styles.containerTitle}>
                <h1>Lista de Locais Armezenamento</h1>
            </div>

            <div className={styles.tableBox}>
                <div className={styles.group}>
                    <div className={styles.groupButtons}>
                        {/* <button className={styles.buttonAdd} onClick={openAddLocal}>Adicionar Local Armazenamento</button> */}
                    </div>
                    <div className={styles.searchBox}>
                        <form onSubmit={(e)=> e.preventDefault()}>
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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereco</th>
                            <th>Responsavel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {locaisFiltrados.length > 0 ? (
                            locaisFiltrados.map((local) => (
                            <tr key={local.id}>
                                <td>{local.id}</td>
                                <td>{local.nome}</td>
                                <td>{local.endereco}</td>
                                <td>{local.responsavel}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhuma local encontrada.</td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>
            {/* {isAddLocalOpen && (
                <div className={styles.addLocalModal}>
                    <div className={styles.modalContent}>
                        <h2>Adicionar Local</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id="nome" required />
                        </form>
                        <button type="submit" >Salvar</button>
                        <button onClick={closeAddLocal}>Fechar</button>
                    </div>
                </div>
            )} */}
        </main>
    )
}
