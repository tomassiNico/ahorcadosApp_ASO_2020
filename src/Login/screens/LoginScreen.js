import React, { useContext,  useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import loginService from '../repository/loginService';
import {store} from '../../Shared/providers/appProvider';
import styles from '../styles/loginStyle';

const LoginScreen = () => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [username, setUsername] = useState('');

    const login = async () => {
        if (username !== '') {
            const dataUser = await loginService.login(username);
            if (dataUser) {
                dispatch({ type: 'LOGIN', data: dataUser.username });
            }
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse o Iniciar Sesion</Text>
            <View style={styles.buttonContainer}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setUsername(text)}
                    placeholder='Ingresa tu nombre de usuario'
                    value={username}
                />
                <Button
                    style={styles.button}
                    title="Iniciar"
                    onPress={login}
                />
            </View>
        </View>
    )
};

export default LoginScreen;
