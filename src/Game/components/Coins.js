import React from 'react';
import { View, Image, Text } from 'react-native';

const Coins = ({ coins }) => (
    <View style={{alignItems: 'center', padding: 8}} >
        <Image
        style={{ height: 30, width: 30 }}
        source={require('../../../assets/images/coin.png')}
        />
        <Text style={{fontSize: 20}}>{coins}</Text>
    </View>
)

export default Coins
