import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const AppProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, {type , data}) => {
        switch(type) {
            case 'SAVE_USER':
                return {
                    ...state,
                    username: data
                };
            case 'SAVE_INVITATION':
                let invitations = [];
                if (state.invitations) {
                    invitations = state.invitations
                }
                invitations.push(data);
                return {
                    ...state,
                    invitations
                };
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider }