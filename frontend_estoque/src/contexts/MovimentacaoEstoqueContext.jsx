import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const MovimentacaoEstoqueContext = createContext({
    movimentacoesEstoque: [],
    adicionarMovimentacaoEstoque: () => {},
    deletarMovimentacaoEstoque: () => {},
    editarMovimentacaoEstoque: () => {},
    setMovimentacoesEstoque: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function MovimentacaoEstoqueProvider({ children }) {
    const [movimentacoesEstoque, setMovimentacoesEstoque] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchMovimentacoesEstoque() {
            try {
                const response = await api.get('/movimentInventories');
                setMovimentacoesEstoque(response.data);
            } catch (error) {
                console.error("Erro ao buscar movimentações:", error);
            }
        }
        fetchMovimentacoesEstoque();
    }, []);

    const deletarMovimentacaoEstoque = async (id) => {
        try {
            await api.delete(`/movimentInventories/${id}`);
            setMovimentacoesEstoque(movimentacoesEstoque.filter(movimentacao => movimentacao.id !== id));
        } catch (error) {
            console.error("Erro ao deletar movimentação:", error);
        }
    };

    const adicionarMovimentacaoEstoque = async (novaMovimentacao) => {
        console.log(novaMovimentacao)
        try {
            const response = await api.post(`/movimentInventories`, novaMovimentacao);
            if(response.status === 201) { 
                const res = await api.get('/movimentInventories');
                setMovimentacoesEstoque(res.data)
                console.log(`Movimentação adicionada com sucesso:`, response.data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao adicionar movimentação:", error);
            return false;
        }
    };
    
    const editarMovimentacaoEstoque = async (id, movimentacao) => {
        
        try {
            const response = await api.put(`/movimentInventories/${id}`, movimentacao);
            if (response.status === 200) {
                const res = await api.get('/movimentInventories');
                setMovimentacoesEstoque(res.data)
                console.log(`Movimentação editada com sucesso:`, response.data);
            }
        } catch (error) {
            console.error("Erro ao editar movimentação:", error);
        }
};

    const contextValue = {
        movimentacoesEstoque,
        adicionarMovimentacaoEstoque,
        deletarMovimentacaoEstoque,
        editarMovimentacaoEstoque,
        setMovimentacoesEstoque,
        filtro,
        setFiltro,
    };

    return (
        <MovimentacaoEstoqueContext.Provider value={contextValue}>
            {children}
        </MovimentacaoEstoqueContext.Provider>
    );
}