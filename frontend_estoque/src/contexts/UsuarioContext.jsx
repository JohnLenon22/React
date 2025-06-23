import { createContext, useState, useEffect } from "react";
import { api } from '../api/setupApi'

export const UsuarioContext = createContext({
    usuarios: [],
    adicionarUsuario: () => {},
    deletarUsuario: () => {},
    editarUsuario: () => {},
    setUsuarios: () => {},
    filtro: '',
    setFiltro: () => {},
});

export function UsuarioProvider({ children }) {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const response = await api.get('/users');
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuarios:", error);
            }
        }
        fetchUsuarios();
    }, []);

    const deletarUsuario = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error("Erro ao deletar usuario:", error);
        }
    };

    const adicionarUsuario = async (novoUsuario) => {
        try {
            const response = await api.post(`/users`, novoUsuario);
            if(response.status === 201) { 
                const res = await api.get('/users');
                setUsuarios(res.data)
                console.log(`Usuario adicionado com sucesso:`, response.data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao adicionar usuario:", error);
            return false;
        }
    };
    
    const editarUsuario = async (id, usuario) => {
        try {
            const response = await api.put(`/users/${id}`, usuario);
            if (response.status === 200) {
                const res = await api.get('/users');
                setUsuarios(res.data)
                console.log(`Usuario editado com sucesso:`, response.data);
            }
        } catch (error) {
            console.error("Erro ao editar usuario:", error);
        }
};

    const contextValue = {
        usuarios,
        adicionarUsuario,
        deletarUsuario,
        editarUsuario,
        setUsuarios,
        filtro,
        setFiltro,
    };

    return (
        <UsuarioContext.Provider value={contextValue}>
            {children}
        </UsuarioContext.Provider>
    );
}