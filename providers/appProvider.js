import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const AppProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, {type , data}) => {
        switch(type) {
            case 'SAVE_USER':
                let oldState = state;
                return {
                    ...oldState,
                    username: data
                };
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider }