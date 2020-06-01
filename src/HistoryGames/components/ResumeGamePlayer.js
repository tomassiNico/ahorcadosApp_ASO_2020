import React from 'react';
import { View, Text } from 'react-native';

const ResumeGamePlayer = ({ username, time, finalState, winner }) => {
  const labelTime = time ? `Duración: ${time}s` : `En curso`;
  let state = finalState ? `Completo la palabra` : `Perdio`;

  if(!finalState){
    state = ''
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF00' }}>
      <Text>Jugador: {username}</Text>
      <Text>{labelTime}</Text>
      <Text>{state}</Text>      
    </View>
  )
}

export default ResumeGamePlayer