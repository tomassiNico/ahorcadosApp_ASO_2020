import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import 'firebase/firestore';
import {store} from "../../Shared/providers/appProvider";
import invitationsService from "../repository/invitationsService";
import styles from '../styles/homeStyles';
import wordsService from "../repository/wordsService";

const MenuScreen = ({ navigation }) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    useEffect(() => {
        invitationsService.subscribeInvitations(globalState.state.username, dispatch);
        invitationsService.subscribeGames(globalState.state.username, dispatch);
        wordsService.updateWords();
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
                    title="Jugar contra un oponente"
                    onPress={() => navigation.navigate('VS')}
                />
                <Button
                    style={styles.button}
                    title="Historial de partidas"
                    onPress={() => navigation.navigate('HistoryVersus')}
                />
            </View>
        </View>
    )
};

export default MenuScreen;
