import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const LocalArmazenamentoContext = createContext({
    locaisArmazenamento: [{nome: "asdaw", endereco: "wae", responsavel: "sadas"}, {nome: "3", endereco: "wae", responsavel: "sadas"}, {nome: "2", endereco: "wae", responsavel: "sadas"}],
    adicionarLocalArmazenamento: () => {},
    deletarLocalArmazenamento: () => {},
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
                // const response = await api.get('/storageLocations');
                // setLocaisArmazenamento(response.data);
                setLocaisArmazenamento()
                console.log(locaisArmazenamento)
            } catch (error) {
                console.error("Erro ao buscar LocaisArmazenamento:", error);
            }
        }
        fetchLocaisArmazenamento();
    }, []);

    // const deletarLocalArmazenamento = async (id) => {
    //     try {
    //         await api.delete(`/storageLocations/${id}`);
    //         setLocaisArmazenamento(locaisArmazenamento.filter(localArmazenamento => localArmazenamento.id !== id));
    //     } catch (error) {
    //         console.error("Erro ao deletar LocalArmazenamento:", error);
    //     }
    // };

    const adicionarLocalArmazenamento = async (novoLocalArmazenamento) => {
        try {
            // const response = await api.post(`/storageLocations/`, novoLocalArmazenamento);
            setLocaisArmazenamento(prevLocalArmazenamento => [...prevLocalArmazenamento, novoLocalArmazenamento]);
            console.log(locaisArmazenamento)
            // if(response.status === 201){
            //     setLocaisArmazenamento(prevLocaisArmazenamento => [...prevLocaisArmazenamento, novoLocaisArmazenamento]);
            //     console.log(`Local Armazenamento adicionado com sucesso: ${response.data}`);
            // }
        } catch (error) {
            console.error("Erro ao adicionar LocalArmazenamento:", error);
        }
    };

    const contextValue = {
        LocaisArmazenamento,
        adicionarLocalArmazenamento,
        deletarLocalArmazenamento,
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