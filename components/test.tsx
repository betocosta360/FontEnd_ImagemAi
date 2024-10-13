import React, { useEffect } from 'react';
import GlobalApi from '@/service/GlobalApi'; // Caminho correto para o seu arquivo de API
import { View, Text } from 'react-native';

const TestApiComponent = () => {
    useEffect(() => {
        const testApiCalls = async () => {
            // Testando GetUserInfo
            try {
                const email = 'test@example.com';
                console.log(`Testing GetUserInfo with email: ${email}`);
                const userInfo = await GlobalApi.GetUserInfo(email);
                console.log('User info:', userInfo.data);

                // Verifica se o usuário não existe, se não, cria um novo
                if (userInfo.data.data.length === 0) {
                    const newUserData = {
                        userEmail: 'gio@gmail.com',
                        userName: 'Giovana Cerqueira',  // Chave correta para o nome
                    };
                    console.log('Testing CreateNewUser');
                    const createdUser = await GlobalApi.CreateNewUser(newUserData);
                    console.log('Created user:', createdUser.data);
                } else {
                    console.log('User already exists');
                }
            } catch (error) {
                console.error('API error:', error); // Tratamento de erro
            }
        };

        testApiCalls();
    }, []);

    return (
        <View>
            <Text>Testing API calls...</Text>
        </View>
    );
};

export default TestApiComponent;
