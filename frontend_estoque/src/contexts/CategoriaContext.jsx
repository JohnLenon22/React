import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const CategoriaContext = createContext({
    categorias: [],
    adicionarCategoria: () => {},
    deletarCategoria: () => {},
    editarCategoria: () => {},
    setCategorias: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function CategoriaProvider({ children }) {
    const [categorias, setCategorias] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get('/categories');
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategorias();
    }, []);

    const deletarCategoria = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategorias(categorias.filter(categoria => categoria.id !== id));
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
        }
    };

    const adicionarCategoria = async (novaCategoria) => {
        try {
            const response = await api.post(`/categories`, novaCategoria);
            if(response.status === 201) { 
                const res = await api.get('/categories');
                setCategorias(res.data)
                console.log(`Categoria adicionada com sucesso:`, response.data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao adicionar categoria:", error);
            return false;
        }
    };
    
    const editarCategoria = async (id, categoria) => {
        console.log(id, categoria);
        try {
            const response = await api.put(`/categories/${id}`, categoria);
            if (response.status === 200) {
                const res = await api.get('/categories');
                setCategorias(res.data)
                console.log(`Categoria editada com sucesso:`, response.data);
            }
        } catch (error) {
            console.error("Erro ao editar categoria:", error);
        }
};

    const contextValue = {
        categorias,
        adicionarCategoria,
        deletarCategoria,
        editarCategoria,
        setCategorias,
        filtro,
        setFiltro,
    };

    return (
        <CategoriaContext.Provider value={contextValue}>
            {children}
        </CategoriaContext.Provider>
    );
}