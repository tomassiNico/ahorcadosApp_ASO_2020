import { useState, useEffect } from 'react';
import WordServicesSQlite from '../../Shared/services/wordServiceSQLite';
import useTimer from '../components/hooks/useTimer';

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
    letterIntents: [],
    coins: 5,
    seconds: 0,
};

export const useGameContext = (word) => {
    const [gameState, setGameState] = useState(initContext);

    const [seconds, stopTimer, resetTimer] =  useTimer();

    const play = (letter, isClue = false) => {
        let { word, stateGameWord, life, letterIntents, win, gameOver, coins } = gameState;
        const indexs = getIndexOfLetter(word, letter);
        let newStateWord = [...stateGameWord];
        if (!indexs.length) {
            life = life - 1
            if (life === 0) {
                gameOver = true
                stopTimer();
            }
        } else {
            indexs.forEach((index) => {
                newStateWord[index] = letter;
            });
        }
        letterIntents.push(letter);

        if (word.toLowerCase() === newStateWord.join('').toLowerCase()) {
            win = true
            stopTimer();
        }

        if (win || gameOver) {
            for (let i = 0; i < word.length; i++) {
                newStateWord[i] = word[i].toUpperCase();
            }
        }

        let newCoins = coins;
        if (isClue) {
            newCoins--;
        }

        setGameState({
            ...gameState,
            stateGameWord: newStateWord,
            life,
            letterIntents,
            win,
            gameOver,
            coins: newCoins
        })
    };

    const newGame = async () => {
        const newWord = word ? word : await WordServicesSQlite.getWord();
        setGameState({
            ...initContext,
            word: newWord,
            stateGameWord: newWord.split('').map(() => '_'),
            letterIntents: [],
            seconds,
        });
    };

    const getClue = () => {
        const { word, stateGameWord } = gameState;
        let index = stateGameWord.findIndex(letter => letter === "_");
        let letter = word.split('')[index].toUpperCase();
        play(letter, true);
    }

    useEffect(() => {
        newGame();
    },[]);

    useEffect(() => {
        setGameState(state => ({...state, seconds}))
    },[seconds]);

    return {
        ...gameState,
        play,
        newGame,
        getClue,
    };
};
