import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const ProdutoContext = createContext({
    produtos: [],
    adicionarProduto: () => {},
    deletarProduto: () => {},
    setProdutos: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function ProdutoProvider({ children }) {
    const [produtos, setProdutos] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await api.get('/products');
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
        fetchProdutos();
    }, []);

    const deletarProduto = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const adicionarProduto = async (novoProduto) => {
        if (!novoProduto.nome || !novoProduto.idCategoria || isNaN(novoProduto.precoCompra) || isNaN(novoProduto.precoVenda)) {
            alert('Erro: Dados do produto inválidos. Por favor, preencha todos os campos corretamente.');
            return;
        }

        try {
            console.log("Enviando para o backend:", novoProduto);
            const response = await api.post(`/products/`, novoProduto);
            if (response.status === 201) {
                setProdutos(prevProdutos => [...prevProdutos, response.data]);
                console.log(`Produto adicionado com sucesso:`, response.data); 
            }
        } catch (error) {
            console.error("Erro ao adicionado produto:", error);
        }
    };

    const contextValue = {
        produtos,
        deletarProduto,
        adicionarProduto, 
        setProdutos,
        filtro,
        setFiltro
    };

    return (
        <ProdutoContext.Provider value={contextValue}>
            {children}
        </ProdutoContext.Provider>
    );
}