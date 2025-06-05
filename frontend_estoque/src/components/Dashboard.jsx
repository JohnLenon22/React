import { useContext } from 'react';
import styles from '../modules/Dashboard.module.css';
import { ProdutoContext } from '../contexts/ProdutoContext';

export default function Dashboard() {

  const { produtos, filtro, setFiltro } = useContext(ProdutoContext);
  const produtosFiltrados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.idCategoria.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.dataCadastro.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.precoVenda.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.precoCompra.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(filtro.toLowerCase())
  )
  
  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.topCards}>
          <div className={styles.card}>
            <label>Total de produtos</label>
            <h2></h2>
          </div>
          <div className={styles.card}>
            <label>Valor Estocado</label>
            <h2></h2>
          </div>
        </div>

        <div className={styles.tableBox}>
          <h3>Alertas de Estoque</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Estoque</th>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.topRight}>
          <div className={styles.outStockCard}>
            <label>Fora de estoque</label>
            <h2></h2>
          </div>
          <div className={styles.searchBox}>
            <form>
              <input 
                  type="text" 
                  placeholder="Buscar" 
                  value={filtro}
                  onChange={(e)=> setFiltro(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className={styles.tableBox}>
          <h3>Lista de produtos</h3>
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
                  <tr key={produto}>
                      <td>{produto.nome}</td>
                      <td>{produto.idCategoria}</td>
                      <td>{produto.dataCadastro}</td>
                      <td>{produto.precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td>{produto.precoCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td>{produto.descricao}</td>
                  </tr>
                  ))
              ) : (
                  <tr>
                      <td>Nenhum produto encontrado.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}