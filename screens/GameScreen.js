import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { GameContext } from '../controllers/GameController';
import { useGameContext } from '../controllers/useGameContext';
import { Keyboard } from '../components/Keyboard';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.4
    },
    letterContainer: {
        padding: 10
    },
    letter: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    lifeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0,
        paddingHorizontal: 8
    },
    lifeText: {
        fontSize: 24
    }
});

const GameScreen = () => {
    const { win, gameOver, stateGameWord, life, letterIntents, play } = useContext(GameContext);

    return (
        <View style={styles.container}>
            {win || gameOver && (
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>{win ? 'Has ganado !! yuju !' : 'Has perdido !! ohooh !'}</Text>
                </View>
            )}
            <View style={styles.wordContainer}>
                {stateGameWord.map((letter, i) => (
                    <View key={i} style={styles.letterContainer}>
                        <Text style={styles.letter}>{letter}</Text>
                    </View>))}
                <View style={styles.lifeContainer}>
                    <Text style={styles.lifeText}>Vidas restantes: {life}</Text>
                </View>
            </View>
            <Keyboard 
                onPressKey={play}
                letterIncludes={letterIntents}
            />
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