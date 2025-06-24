import { useContext } from 'react';
import styles from '../modules/Dashboard.module.css';
import { ProdutoContext } from '../contexts/ProdutoContext';
import { CategoriaContext } from '../contexts/CategoriaContext';
import { LocalArmazenamentoContext } from '../contexts/LocalArmazenamentoContext';

export default function Dashboard() {

  const { produtos, filtro, setFiltro } = useContext(ProdutoContext);
  const { categorias } = useContext(CategoriaContext)
  const { locaisArmazenamento } = useContext(LocalArmazenamentoContext)

  const produtosFiltrados = produtos.filter(produto => {
        const filtroLower = filtro.toLowerCase();

        const id = String(produto.nome || '');
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
    }).sort((a, b) => a.nome.localeCompare(b.nome));

  const alertaProdutos = produtos.filter(produto => produto.quantidade === 0)

  const valorEstocado = produtos ? produtos.reduce((acc, produto) => {
        const preco = parseFloat(produto.precoCompra); 
        return acc + (isNaN(preco) ? 0 : preco);
  }, 0) : 0;
  
  const totalProdutos = produtos ? produtos.length : null

  const getNomeCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find(cat => String(cat.id || cat.idCategoria) === String(idCategoria));
    return categoriaEncontrada ? `${categoriaEncontrada.nome}` : `Nome não encontrado`;
  };

  const getNomeLocalArmazenamento = (idLocalArmazenamento) => {
    const localArmazenamentoEncontrada = locaisArmazenamento.find(local => String(local.id || local.idLocalArmazenamento) === String(idLocalArmazenamento));
    return localArmazenamentoEncontrada ? `${localArmazenamentoEncontrada.nome}` : `Nome não encontrado`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.topCards}>
          <div className={styles.card}>
            <label>Total de produtos</label>
            <h2>{totalProdutos}</h2>
          </div>
          <div className={styles.card}>
            <label>Valor Estocado</label>
            <h2>{valorEstocado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
          </div>
        </div>

        <div className={styles.tableBox}>
          <h3>Alertas de Estoque</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              {alertaProdutos.length > 0 ? (
                alertaProdutos.map((produto) => (
                  <tr value={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>{getNomeLocalArmazenamento(produto.idLocalArmazenamento)}</td>
                  </tr>
                ))
              ) : (
                  <tr>
                      <td>Nenhum produto em alerta.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.topRight}>
          <div className={styles.outStockCard}>
            <label>Fora de estoque</label>
            <h2>20</h2>
          </div>
          <div className={styles.searchBox}>
            <form>
              <input 
                  type="text" 
                  placeholder="Buscar ( Nome,Categoria )" 
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
                  <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>{getNomeCategoria(produto.idCategoria)}</td>
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