import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { GameContext } from '../controllers/GameController';
import { useGameContext } from '../controllers/useGameContext';
import { Keyboard } from '../components/Keyboard';
import Coins from '../components/Coins';
import Lifes from '../components/Lifes';
import Clock from '../components/Clock';
import useTimer from '../components/hooks/useTimer';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.6
  },
  letterContainer: {
    paddingHorizontal: 5,
    paddingTop: 40
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});

const Timer = ({ seconds  }) => {
  const mins = parseInt(seconds / 60);
  const secs = (seconds%60).toString().padStart(2, '0');

  return (
    <View>
        <Text style={styles.lifeText}>{mins}:{secs}</Text>
    </View>
  )
}

const GameScreen = () => {
  const { win, gameOver, stateGameWord, life, letterIntents, play, newGame, word, coins, getClue } = useContext(GameContext);
  const [timer, setTimer] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimer(timer => timer+1);
    },1000);

    return () => clearInterval(interval)
  }, [])

  const [seconds, stopTimer] =  useTimer();

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
        {(win || gameOver) && (
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

export const GameScreenWithContext = () => {
  const stateContext = useGameContext();
  return (
      <GameContext.Provider value={stateContext}>
        <GameScreen />
      </GameContext.Provider>)
}