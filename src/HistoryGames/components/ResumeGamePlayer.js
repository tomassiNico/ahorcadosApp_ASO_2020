import React from 'react';
import { View, Text } from 'react-native';

const ResumeGamePlayer = ({ username, time, finalState, winner }) => {
  const labelTime = time ? `Duración: ${time}s` : `En curso`;
  let state = finalState ? `Completo la palabra` : `Perdio`;

  if(!finalState){
    state = ''
  }
  
  const style = winner === username ? {
      color: 'green'
  } : { }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF00' }}>
      <Text style={style}>Jugador: {username}</Text>
      <Text style={style}>{labelTime}</Text>
      <Text style={style}>{state}</Text>      
    </View>
  )
}

export default ResumeGamePlayer