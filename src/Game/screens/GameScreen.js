import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
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
import gameService from "../repository/gameService";


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

export const GameScreenWithContext = ({ route }) => {
  let { game, isVersus, word, username1 } = route.params ? route.params : {};
  const stateContext = useGameContext(word);
  const globalState = useContext(store);

  useEffect(() => {
    const updateGame = async (idGame, data) => {
      await gameService.updateVersusGame(idGame, data);
    };
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
      updateGame(game.idGame, updatedData);
    }
  }, [stateContext.win, stateContext.gameOver])

  return (
      <GameContext.Provider value={stateContext}>
        <GameScreen isVersus={isVersus || false} />
      </GameContext.Provider>)
}
