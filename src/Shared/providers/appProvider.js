import React, {createContext, useReducer} from 'react';

const initialState = {
    username: null,
    games: []
};
const store = createContext(initialState);
const { Provider } = store;

const AppProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, {type , data}) => {
        let games = [...state.games]
        switch(type) {
            case 'LOGIN':
                return {
                    ...state,
                    username: data
                };
            case 'LOGOUT':
                return initialState;
            case 'SAVE_GAME':
                games.push(data);
                return {
                    ...state,
                    games
                };
            case 'UPDATE_GAME':
                games = state.games.filter(invitation => invitation.idGame !== data.idGame)
                games.push(data);
                return {
                    ...state,
                    games
                };
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider }
