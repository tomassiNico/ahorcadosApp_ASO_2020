import { createContext } from 'react';

const word = 'ricardo';

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

export const GameContext = createContext(gameInitState);


