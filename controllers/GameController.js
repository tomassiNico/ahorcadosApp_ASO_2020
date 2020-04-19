import { createContext } from 'react';

const word = 'ricardo';

export const gameInitState = { 
     word: word,
     stateWord: word.split('').map(() => '_'),
     life: 3,
     letterIntents: [],
     win: false,
     play: () => {}
 };

export const GameContext = createContext(gameInitState);


