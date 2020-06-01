import React, { useContext } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import {store} from '../../Shared/providers/appProvider';
import { FlatList } from 'react-native-gesture-handler';
import GameResume from '../components/GameResume';

const HistoryGames = () => {
  const { state } = useContext(store);
  const games = state.games ? state.games : [];
  return(
    <View>
      <FlatList 
        data={games}
        renderItem={({ item }) => <GameResume game={item} />}
        keyExtractor={(item) => item.idGame}
      />
    </View>
  )
}

export default HistoryGames