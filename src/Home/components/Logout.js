import React, {useContext, useState} from 'react';
import {Badge, Overlay, Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from "../../Shared/providers/appProvider";
import {Text, View} from "react-native";

export default () => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    return (
        <View >
            <Button
                icon={
                    <Icon
                        name="sign-out"
                        size={15}
                        color="blue"
                    />
                }
                onPress={() => {
                    dispatch({ type: 'LOGOUT'});
                }}
            />
        </View>
    )
}
