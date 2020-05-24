import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import 'firebase/firestore';
import {store} from "../providers/appProvider";
import firebaseService from "../repositories/firebaseService";
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
    const globalState = useContext(store);
    const { dispatch } = globalState;
    useEffect(() => {
        firebaseService.subscribeWithTwoConditions(
            'games',
            'username2',
            '==',
            globalState.state.username,
            'winner',
            '==',
            '',
            (data) => {
                if (data.winner === ''){
                    dispatch({ type: 'SAVE_INVITATION', data });
                }
            },
        )
    }, []);
    return (
        <View style={styles.container}>
            <Text >Bienvenido {globalState.state.username}</Text>
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
};

export default MenuScreen;