import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { reducer } from '../context/GameController';
import { GameContext } from '../context/GameController';
import { useGameContext } from '../context/useGameContext';

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
    keyboard: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 16,
        alignItems: 'center'
    },
    buttonKeyboard: {
        paddingHorizontal: 10
    },
    textKeyboard: {
        
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


const genCharArray = (charA, charZ) => {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

export const GameScreen = () => {
    const context = useContext(GameContext);

    const getTextStyle = (letter) => {
        let style = {
            fontSize: 30,
            paddingVertical: 12
        }
        if (context.letterIntents.includes(letter)) {
            style = {
                ...style,
                textDecorationLine: "line-through",
                color: 'green'
            }
        }
        return style
    }

    return (
        <View style={styles.container}>
            {context.win && (
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}> Has ganado !! yuju ! </Text>
                </View>
            )}
            {context.gameOver && (
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}> Has perdido !! ohooh ! </Text>
                </View>
            )}
            <View style={styles.wordContainer}>
                {context.stateGameWord.map(letter => (
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>{letter}</Text>
                    </View>))}
                <View style={styles.lifeContainer}>
                    <Text style={styles.lifeText}>Vidas restantes: {context.life}</Text>
                </View>
            </View>
            <View style={styles.keyboard}>
                {genCharArray('A', 'H').map(letter => (
                    <View style={styles.buttonKeyboard}>
                        <TouchableOpacity onPress={() => context.play(letter)} disabled={context.letterIntents.includes(letter)}>
                            <Text style={getTextStyle(letter)}>{letter}</Text>
                        </TouchableOpacity>
                    </View>))}
            </View>
            <View style={styles.keyboard}>
                {genCharArray('I', 'Q').map(letter => (
                    <View style={styles.buttonKeyboard}>
                        <TouchableOpacity onPress={() => context.play(letter)} disabled={context.letterIntents.includes(letter)}>
                            <Text style={getTextStyle(letter)}>{letter}</Text>
                        </TouchableOpacity>
                    </View>))}
            </View>
            <View style={styles.keyboard}>
                {genCharArray('R', 'Z').map(letter => (
                    <View style={styles.buttonKeyboard}>
                        <TouchableOpacity onPress={() => context.play(letter)} disabled={context.letterIntents.includes(letter)} >
                            <Text style={getTextStyle(letter)}>{letter}</Text>
                        </TouchableOpacity>
                    </View>))}
            </View>
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