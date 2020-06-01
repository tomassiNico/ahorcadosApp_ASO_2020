import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import 'firebase/firestore';
import {store} from "../../Shared/providers/appProvider";
import invitationsService from "../repository/invitationsService";

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
        invitationsService.subscribeInvitations(globalState.state.username, dispatch);
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
            </View>
        </View>
    )
};

export default MenuScreen;
