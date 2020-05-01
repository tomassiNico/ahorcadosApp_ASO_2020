import { useState, useEffect } from 'react';
import WordServices from '../repositories/WordServices';

const getIndexOfLetter = (word, letter) => {
    const indexs = [];
    for (var i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() === letter.toLowerCase()) indexs.push(i);
    }
    return indexs
};

const wordInit = '';

const initContext = {
    word: wordInit,
    stateGameWord: wordInit.split('').map(() => '_'),
    life: 7,
    win: false,
    gameOver: false,
    letterIntents: []
};

export const useGameContext = () => {
    const [gameState, setGameState] = useState(initContext);

    const play = (letter) => {
        let { word, stateGameWord, life, letterIntents, win, gameOver } = gameState;
        const indexs = getIndexOfLetter(word, letter);
        let newStateWord = [...stateGameWord];
        if (!indexs.length) {
            life = life - 1
            if (life === 0) {
                gameOver = true
            }
        } else {
            indexs.forEach((index) => {
                newStateWord[index] = letter;
            });
        }
        letterIntents.push(letter);

        if (word.toLowerCase() === newStateWord.join('').toLowerCase()) {
            win = true
        }

        if ( win || gameOver) {
            for (let i = 0; i < word.length; i++) {
                newStateWord[i] = word[i].toUpperCase();
            }
        }
        setGameState({
            ...gameState,
            stateGameWord: newStateWord,
            life,
            letterIntents,
            win,
            gameOver
        })
    };

    const newGame = async () => {
        const newWord = await WordServices.getWord();
        setGameState({
            ...initContext,
            word: newWord,
            stateGameWord: newWord.split('').map(() => '_'),
            letterIntents: []
        })
    };

    const [contextState, setcontextState] = useState({
        ...gameState,
        play
    });

    useEffect(() => {
        setcontextState({
            ...gameState,
            play,
            newGame
        })
    }, [gameState]);

    useEffect(
        () => {
            newGame()
        }
        , []);

    return contextState;
};