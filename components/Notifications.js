import React, {useContext, useState} from 'react';
import {Badge, Overlay, Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from "../providers/appProvider";
import {Text, View} from "react-native";
import singletonFirebaseServices from '../repositories/firebaseService';

export default (props) => {
    const [isListVisible, setListVisible] =useState(false)
    const globalState = useContext(store);
    const {invitations} = globalState.state;
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
                        return (
                        <View>
                            <Text>{invitation.username1}</Text>
                            <Button
                                onPress={async () => {
                                    const game = await singletonFirebaseServices.getGame(invitation.idGame);
                                    game.get().then(doc => {
                                        setListVisible(false);
                                        props.navigation.navigate('Game', { game: game, isVersus: true, word: doc.data().word,  username1: doc.data().username1, username2: doc.data().username2 })
                                    })
                                }}
                                icon={
                                    <Icon
                                        name="check-circle"
                                        size={15}
                                        color="white"
                                    />
                                }
                            />
                            <Button
                                onPress={async () => {
                                    const game = await singletonFirebaseServices.getGame(invitation.idGame);
                                    game.update({
                                        winner: '-'
                                    })
                                }}
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