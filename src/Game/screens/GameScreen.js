import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { GameContext } from '../context/GameController';
import { useGameContext } from '../context/useGameContext';
import { Keyboard } from '../components/Keyboard';
import Coins from '../components/Coins';
import Lifes from '../components/Lifes';
import Clock from '../components/Clock';
import {store} from "../../Shared/providers/appProvider";
import styles from '../styles/gameStyle';


const GameScreen = ({ isVersus }) => {
  const { win, gameOver, stateGameWord, life, letterIntents, play, newGame, word, coins, seconds, getClue } = useContext(GameContext);


  return (
      <View style={styles.container}>
        {(win || gameOver) && (
            <>
              <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                <Text style={{ fontSize: 34, fontWeight: 'bold', color: win ? 'green' : 'red' }}>{win ? 'Has ganado !! yuju !' : 'Has perdido !! ohooh !'}</Text>
              </View>
            </>
        )}
        <View style={{ flexDirection: 'row', justifyContent:  'center' }} >
          <Lifes lifes={life} />
          <Clock seconds={seconds} />
          <Coins coins={coins} />
        </View>
        <View style={styles.wordContainer}>
          {stateGameWord.map((letter, i) => (
            <View key={i} style={styles.letterContainer}>
              <Text style={gameOver ? { ...styles.letter, color: 'red' } : styles.letter}>{letter}</Text>
            </View>))}
        </View>
        <Keyboard
            onPressKey={play}
            letterIncludes={letterIntents}
            actualWord={word}
            disabled={win || gameOver}
        />
        {((!win && !gameOver) && coins > 0) && (
            <>
              <View style={{ paddingHorizontal: 24 }} >
                <Button
                    title="Usar una moneda"
                    onPress={getClue}
                />
              </View>
            </>
        )}
        {((win || gameOver) && !isVersus) && (
            <>
              <View style={{ paddingHorizontal: 24 }} >
                <Button
                    title="Jugar de nuevo"
                    onPress={newGame}
                />
              </View>
            </>
        )}
      </View>
  )
}

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
}

export const GameScreenWithContext = ({ navigation, route }) => {
  let { game, isVersus, word, username1, username2 } = route.params ? route.params : {};
  const stateContext = useGameContext(word);
  const globalState = useContext(store);

  useEffect(() => {
    if(isVersus && (stateContext.win || stateContext.gameOver)){
      let updatedData = {}
      if(username1 === globalState.state.username){
        updatedData ={
          state1: stateContext.win ? 'win' : 'lose',
          time1: stateContext.seconds,
        };
      }else{
        updatedData = {
          state2: stateContext.win ? 'win' : 'lose',
          time2: stateContext.seconds,
        }
      }
      game.get().then((doc) => {
        const gameData = doc.data();
        if(gameData.state1 || gameData.state2){
          let winner = getWinner({...gameData, ...updatedData});
          updatedData = {
            ...updatedData,
            winner
          }
        }
        game.update(updatedData)
      })
    }
  }, [stateContext.win, stateContext.gameOver])

  return (
      <GameContext.Provider value={stateContext}>
        <GameScreen isVersus={isVersus || false} />
      </GameContext.Provider>)
}
