import React from 'react';
import { View, Text } from 'react-native';
import ResumeGamePlayer from './ResumeGamePlayer';

const GameResume = ({game}) => (
  <View style={{
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF80',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1
  }}>
      <Text>Palabra: {game.word} {game.winner ? `|| Ganador: ${game.winner}` : ''}</Text>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
        <ResumeGamePlayer 
          username={game.username1}
          time={game.time1}
          finalState={game.state1}
          winner={game.winner}
        />
        <ResumeGamePlayer 
          username={game.username2}
          time={game.time2} 
          finalState={game.state2}
          winner={game.winner}
        />
      </View>
  </View>
)

export default GameResume