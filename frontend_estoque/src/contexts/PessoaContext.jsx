import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const PessoaContext = createContext({
    pessoas: [],
    adicionarPessoa: () => {},
    deletarPessoa: () => {},
    editarPessoa: () => {},
    setPessoas: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function PessoaProvider({ children }) {
    const [pessoas, setPessoas] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchPessoas() {
            try {
                const response = await api.get('/persons');
                setPessoas(response.data);
            } catch (error) {
                console.error("Erro ao buscar pessoas:", error);
            }
        }
        fetchPessoas();
    }, []);

    const deletarPessoa = async (id) => {
        try {
            await api.delete(`/persons/${id}`);
            setPessoas(Pessoas.filter(Pessoa => Pessoa.id !== id));
        } catch (error) {
            console.error("Erro ao deletar pessoa:", error);
        }
    };

    const adicionarPessoa = async (novaPessoa) => {
        try {
            const response = await api.post(`/persons`, novaPessoa);
            if(response.status === 201) { 
                const res = await api.get('/persons');
                setPessoas(res.data)
                console.log(`Pessoa adicionada com sucesso:`, response.data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao adicionar pessoa:", error);
            return false;
        }
    };
    
    const editarPessoa = async (id, pessoa) => {
        try {
            const response = await api.put(`/persons/${id}`, pessoa);
            if (response.status === 200) {
                const res = await api.get('/persons');
                setPessoas(res.data)
                console.log(`Pessoa editada com sucesso:`, response.data);
            }
        } catch (error) {
            console.error("Erro ao editar pessoa:", error);
        }
};

    const contextValue = {
        pessoas,
        adicionarPessoa,
        deletarPessoa,
        editarPessoa,
        setPessoas,
        filtro,
        setFiltro,
    };

    return (
        <PessoaContext.Provider value={contextValue}>
            {children}
        </PessoaContext.Provider>
    );
}