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
import * as firebase from 'firebase'
import 'firebase/firestore';

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
  },
  lifeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingTop: 0
  },
  lifeText: {
    fontSize: 24
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 20,
    paddingHorizontal: 8,
    paddingTop: 5
  },
  coinsText: {
    fontSize: 24
  }
});

const GameScreen = () => {
  const { win, gameOver, stateGameWord, life, letterIntents, play, newGame, word, coins, getClue } = useContext(GameContext);
  const [db , setDB ] = useState({});

  useEffect(() => {
    const db = firebase.firestore();
    setDB(db);
  }, []);
  useEffect(() => {
    getUsers();
  }, [db]);
  const getUsers = async () => {
    await db.collection('users').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }).catch(err => {
      console.log(err);
    });
  };
  return (
    <View style={styles.container}>
      {(win || gameOver) && (
        <>
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Text style={{ fontSize: 34, fontWeight: 'bold', color: win ? 'green' : 'red' }}>{win ? 'Has ganado !! yuju !' : 'Has perdido !! ohooh !'}</Text>
          </View>
        </>
      )}
      <View style={styles.wordContainer}>
        {stateGameWord.map((letter, i) => (
          <View key={i} style={styles.letterContainer}>
            <Text style={gameOver ? { ...styles.letter, color: 'red' } : styles.letter}>{letter}</Text>
          </View>))}
        <View style={styles.lifeContainer}>
          <Text style={styles.lifeText}>Vidas restantes: {life}</Text>
        </View>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>Monedas: {coins}</Text>
        </View>
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