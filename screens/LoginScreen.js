import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import { AppContext } from '../controllers/AppController';
import { useAppContext } from '../controllers/useAppContext';
import loginService from '../repositories/loginService';

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
    const {saveUser, getUser } = useContext(AppContext);
    const [username, setUsername] = useState('');

    const login = async () => {
        if (username !== '') {
            const dataUser = await loginService.login(username);
            if (dataUser) {
                saveUser(dataUser.username);
                navigation.navigate('Menu')
            }
        }
    };
    const ver = () => {
        let borrar = getUser();
        console.log(borrar);
    }
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
                <Button
                style={styles.button}
                title="ver"
                onPress={ver}
                />
            </View>
        </View>
    )
};

export const LoginScreenWithContext = (props) => {
    const stateContext = useAppContext();
    return (
        <AppContext.Provider value={stateContext}>
            <LoginScreen {...props}/>
        </AppContext.Provider>)
}