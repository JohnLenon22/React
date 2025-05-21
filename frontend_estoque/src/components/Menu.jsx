
export default function Menu(){

    return(
        <div className={styles.container}>
            <nav className={styles.containerNav}>
                <button>Dashboard</button>
                <button>Categoria</button>
                <button>Produto</button>
                <button>Local Armazenamento</button>
            </nav>
            <main className={styles.containerMain}>
                <header>
                    <div className={labelGroup}>
                        <label>Total de produtos</label>
                        <label>3.989</label>
                    </div>

                    <div className={labelGroup}>
                        <label>Valor Estocado</label>
                        <label>R$ 348.920</label>
                    </div>

                    <div className={labelGroup}>
                        <label>Fora de estoque</label>
                        <label>2</label>
                        <input placeholder="Buscar produto"/>
                    </div>

                </header>

                <div>
                    <article>

                    </article>
                    <article>

                    </article>
                </div>
                
            </main>
        </div>
    )

}