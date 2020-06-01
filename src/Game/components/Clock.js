import React from 'react';
import { View, Image, Text } from 'react-native';


const Clock = ({ seconds }) => {
    const mins = parseInt(seconds/60);
    const secs = (seconds%60).toString().padStart(2, '0');

    return (
        <View style={{alignItems: 'center', padding: 8}}>
            <Image
                style={{ height: 30, width: 30 }}
                source={require('../../../assets/images/timer.png')}
            />
            <Text style={{fontSize: 20}}>{mins}:{secs}</Text>
        </View>
    )
}

export default Clock
