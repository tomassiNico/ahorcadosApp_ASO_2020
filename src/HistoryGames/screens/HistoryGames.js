import React, {useContext, useEffect} from 'react';
import { View } from 'react-native';
import {store} from '../../Shared/providers/appProvider';
import { FlatList } from 'react-native-gesture-handler';
import GameResume from '../components/GameResume';
import singletonFirebaseServices from "../../Shared/services/firebaseService";

const getWinner = (game) => {
    const {state1, state2, time1, time2, username1, username2 } =  game;
    let winner;
    if(state1 === state2 && time1 === time2){
        return "empate"
    }

    if(state2 !== state1){
        winner = state1 === "win" ? username1 : username2;
    }else if(state1 === "lose" && state1 === "lose"){
        winner = "empate";
    }else {
        winner = time1 < time2 ? username1 : username2;
    }
    return winner
};

const HistoryGames = () => {
  const { state } = useContext(store);
  const games = state.games ? state.games : [];

  useEffect(()=> {
      let gamesWihoutWinner = games.filter(game => game.winner === '');
      gamesWihoutWinner.forEach(game => {
          if (game.state1 && game.state2) {
              let winner = getWinner(game);
              let updatedData = { winner };
              singletonFirebaseServices.updateData('games', game.idGame, updatedData);
          }
      })
  }, [games])
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
