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
import * as firebase from 'firebase'
import 'firebase/firestore';

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
    const { saveUser, getUser } = useContext(AppContext);
    const [db , setDB ] = useState({});
    const [username, setUsername] = useState('');

    useEffect(() => {
        const db = firebase.firestore();
        setDB(db);
    }, []);

    const login = () => {
        if (username !== '') {
            db.collection('users').add({
                username
            }).then(docRef => {
                console.log('Ingreso correctamente')
            }).catch( err => {
                console.log('El usuario ingresado ya existe')
            })
        }
        navigation.navigate('Menu')
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
            </View>
        </View>
    )
}

export const LoginScreenWithContext = (props) => {
    const stateContext = useAppContext();
    return (
        <AppContext.Provider value={stateContext}>
            <LoginScreen {...props}/>
        </AppContext.Provider>)
}