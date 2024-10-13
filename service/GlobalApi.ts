import axios from 'axios';

// Criação de um cliente Axios com baseURL e headers personalizados
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',  // URL do Strapi
    headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`, // Chave de autenticação
    },
});

// Função para obter informações de um usuário pelo email
const GetUserInfo = async (email) => {
    try {

        const response = await axiosClient.get(`user-lists?filters[userEmail][$eq]=${encodeURIComponent(email)}`);

        return response;
    } catch (error) {

        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

// Função para criar um novo usuário
const CreateNewUser = async (data) => {
    try {

        const response = await axiosClient.post('/user-lists', { data }); // Enviando os dados corretos

        return response;
    } catch (error) {

        throw error;
    }
};

// Exportando as funções
export default {
    GetUserInfo,
    CreateNewUser,
};
