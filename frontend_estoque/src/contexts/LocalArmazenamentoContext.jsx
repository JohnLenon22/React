import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const LocalArmazenamentoContext = createContext({
    locaisArmazenamento: [],
    adicionarLocalArmazenamento: () => {},
    deletarLocalArmazenamento: () => {},
    editarLocalArmazenamento: () =>  {},
    setLocaisArmazenamento: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function LocalArmazenamentoProvider({ children }) {
    const [locaisArmazenamento, setLocaisArmazenamento] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchLocaisArmazenamento() {
            try {
                const response = await api.get('/storageLocations');
                setLocaisArmazenamento(response.data);

            } catch (error) {
                console.error("Erro ao buscar Locais Armazenamento:", error);
            }
        }
        fetchLocaisArmazenamento();
    }, []);

    const deletarLocalArmazenamento = async (id) => {
        try {
            await api.delete(`/storageLocations/${id}`);
            setLocaisArmazenamento(locaisArmazenamento.filter(localArmazenamento => localArmazenamento.id !== id));
        } catch (error) {
            console.error("Erro ao deletar Local Armazenamento:", error);
        }
    };

    const adicionarLocalArmazenamento = async (novoLocalArmazenamento) => {
        try {
            const response = await api.post(`/storageLocations/`, novoLocalArmazenamento);
            if(response.status === 201){
                const res = await api.get('/storageLocations');
                setLocaisArmazenamento(res.data);
                console.log(`Local Armazenamento adicionado com sucesso: ${response.data}`);
            }
        } catch (error) {
            console.error("Erro ao adicionar Local Armazenamento:", error);
        }
    };

    const editarLocalArmazenamento = async (id, localArmazenamento) => {
        try {
            const response = await api.put(`/storageLocations/${id}`, localArmazenamento);
            if(response.status === 200){
                const res = await api.get('/storageLocations');
                setLocaisArmazenamento(res.data);
                console.log(`Local Armazenamento editado com sucesso: ${response.data}`);
            }
        } catch (error) {
            console.error("Erro ao editar Local Armazenamento:", error);
        }
    };



    const contextValue = {
        locaisArmazenamento,
        adicionarLocalArmazenamento,
        deletarLocalArmazenamento,
        editarLocalArmazenamento,
        setLocaisArmazenamento,
        filtro,
        setFiltro,
    };

    return (
        <LocalArmazenamentoContext.Provider value={contextValue}>
            {children}
        </LocalArmazenamentoContext.Provider>
    );
}