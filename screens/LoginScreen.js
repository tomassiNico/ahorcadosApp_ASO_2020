import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import loginService from '../repositories/loginService';
import {store} from '../providers/appProvider';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.4,
        justifyContent: 'space-around'
    },
    title: {
        flex: 0.2,
        fontSize: 30,
        textAlign: 'center',
    },
});

const LoginScreen = ({ navigation }) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [username, setUsername] = useState('');

    const login = async () => {
        if (username !== '') {
            const dataUser = await loginService.login(username);
            if (dataUser) {
                dispatch({ type: 'SAVE_USER', data: dataUser.username });
                navigation.navigate('Menu')
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