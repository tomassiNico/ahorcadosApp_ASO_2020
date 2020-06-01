import React from 'react';
import { View, Image, Text } from 'react-native';

const Lifes = ({ lifes }) => (
    <View style={{alignItems: 'center', padding: 8}} >
        <Image
        style={{ height: 30, width: 30 }}
        source={require('../../../assets/images/heart.png')}
        />
        <Text style={{fontSize: 20}}>{lifes}</Text>
    </View>
)

export default Lifes
