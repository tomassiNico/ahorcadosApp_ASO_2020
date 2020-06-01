import React, {useContext, useState} from 'react';
import {Badge, Overlay, Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from "../../Shared/providers/appProvider";
import {Text, View} from "react-native";
import gameService from "../../Game/repository/gameService";

export default (props) => {
    const [isListVisible, setListVisible] =useState(false)
    const globalState = useContext(store);
    const {invitations} = globalState.state;
    const _acceptGame = async (idGame) => {
        const game = await gameService.getVersusGame(idGame);
        game.get().then(doc => {
            setListVisible(false);
            props.navigation.navigate('Game', { game: game, isVersus: true, word: doc.data().word,  username1: doc.data().username1, username2: doc.data().username2 })
        })
    };
    const _rejectGame = async (idGame) => {
        const game = await gameService.getVersusGame(idGame);
        await game.update({
            winner: '-'
        })
    };
    return (
        <View >
            <Badge
                value={invitations ? invitations.length : 0}
                status="success"
                onPress={() => setListVisible(true)}
            />
            <Overlay isVisible={isListVisible} styles={{flex: 1}}>
                <Text>Invitaciones pendientes: </Text>
                {
                    invitations && invitations.map((invitation, i) => {
                        const {username1, idGame} = invitation;
                        return (
                        <View>
                            <Text>{username1}</Text>
                            <Button
                                onPress={() => _acceptGame(idGame)}
                                icon={
                                    <Icon
                                        name="check-circle"
                                        size={15}
                                        color="white"
                                    />
                                }
                            />
                            <Button
                                onPress={() => _rejectGame(idGame)}
                                icon={
                                    <Icon
                                        name="window-close"
                                        size={15}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                    )})
                }
                <Button onPress={() => setListVisible(false)} title="Cerrar" />
            </Overlay>
        </View>


    )
}
