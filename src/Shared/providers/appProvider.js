import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const AppProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, {type , data}) => {
        let games = [];
        switch(type) {
            case 'LOGIN':
                return {
                    ...state,
                    username: data
                };
            case 'LOGOUT':
                return {};
            case 'SAVE_GAME':
                if (state.games) {
                    games = state.games
                }
                games.push(data);
                return {
                    ...state,
                    games
                };
            case 'UPDATE_GAME':
                if (state.invitations) {
                    games = state.games.filter(invitation => invitation.idGame !== data.idGame)
                }
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
