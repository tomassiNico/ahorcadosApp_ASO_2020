import React, {useContext, useState} from 'react';
import {Badge, Overlay, Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from "../providers/appProvider";
import {Text, View} from "react-native";

export default () => {
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
                    invitations && invitations.map((invitation, i) => (
                        <View>
                            <Text>{invitation.username1}</Text>
                            <Button
                                onPress={() => {}}
                                icon={
                                    <Icon
                                        name="check-circle"
                                        size={15}
                                        color="white"
                                    />
                                }
                            />
                            <Button
                                onPress={() => {}}
                                icon={
                                    <Icon
                                        name="window-close"
                                        size={15}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                    ))
                }
                <Button onPress={() => setListVisible(false)} title="Cerrar" />
            </Overlay>
        </View>


    )
}