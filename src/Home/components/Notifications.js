import React, {useContext, useState} from 'react';
import {Badge, Overlay, Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from "../../Shared/providers/appProvider";
import {Text, View} from "react-native";
import gameService from "../../Game/repository/gameService";

export default (props) => {
    const [isListVisible, setListVisible] =useState(false)
    const globalState = useContext(store);
    const {games, username} = globalState.state;
    const invitations = games && Array.isArray(games) ? games.filter(game => (game.winner === '' && game.username2 === username)): [];
    const _acceptGame = async (idGame) => {
        const game = await gameService.getVersusGame(idGame);
        setListVisible(false);
        const {word, username1, username2} = game;
        props.navigation.navigate('Game', { game: game, isVersus: true, word,  username1, username2})
    };
    const _rejectGame = async (idGame, oponent) => {
        await gameService.updateVersusGame(idGame, {winner: oponent, time2: '0'})
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
                                onPress={() => _rejectGame(idGame, username1)}
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
