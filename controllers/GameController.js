import { createContext } from 'react';
import WordServices from '../repositories/WordServices';

const word = '';

export const gameInitState = {
    word: word,
    stateGameWord: word.split('').map(() => '_'),
    life: 3,
    letterIntents: [],
    win: false,
    gameOver: false,
    play: () => { },
    newGame: () => { }
};

export const createNewState = async () => {
    let word = await WordServices.getWord();
    return {
        word: word,
        stateGameWord: word.split('').map(() => '_'),
        life: 3,
        letterIntents: [],
        win: false,
        gameOver: false,
        play: () => { },
        newGame: () => { }
    }
};

export const GameContext = createContext(gameInitState);


