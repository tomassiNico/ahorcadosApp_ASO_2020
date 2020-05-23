import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
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
        fontSize: 50,
        textAlign: 'center',
    },
});

const MenuScreen = ({ navigation }) => {
    const { saveUser, getUser, username } = useContext(AppContext);
    const [db , setDB ] = useState({});

    useEffect(() => {
        const db = firebase.firestore();
        setDB(db);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ahorcados</Text>
            <View style={styles.buttonContainer}>
                <Button
                    color="red"
                    title="Jugar solo"
                    onPress={() => navigation.navigate('Game')}
                />
                <Button
                    style={styles.button}
                    title="Jugar VS"
                    onPress={() => navigation.navigate('Game')}
                />
            </View>
        </View>
    )
}

export const MenuScreenWithContext = (props) => {
    const stateContext = useAppContext();
    return (
        <AppContext.Provider value={stateContext}>
            <MenuScreen {...props}/>
        </AppContext.Provider>)
}