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
    letterIntents: [],
    coins: 5
};

export const useGameContext = () => {
    const [gameState, setGameState] = useState(initContext);

    const play = (letter, isClue = false) => {
        let { word, stateGameWord, life, letterIntents, win, gameOver, coins } = gameState;
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
        const newWord = await WordServices.getWord();
        setGameState({
            ...initContext,
            word: newWord,
            stateGameWord: newWord.split('').map(() => '_'),
            letterIntents: []
        })
    };

    const getClue = () => {
        const { word, stateGameWord } = gameState;
        let index = stateGameWord.findIndex(letter => letter === "_");
        let letter = word.split('')[index].toUpperCase();
        play(letter, true);
    }

    const [contextState, setcontextState] = useState({
        ...gameState,
        play,
        getClue
    });

    useEffect(() => {
        setcontextState({
            ...gameState,
            play,
            newGame,
            getClue
        })
    }, [gameState]);

    useEffect(
        () => {
            newGame()
        }
        , []);

    return contextState;
};