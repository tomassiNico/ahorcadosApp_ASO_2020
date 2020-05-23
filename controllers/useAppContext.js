import { useState, useEffect } from 'react';


export const useAppContext = () => {

    const saveUser = (username) => {
        setAppState({
          ...appState,
          username
      });
    };

    const getUser = () => {
        return appState.username;
    };

    const [appState, setAppState] = useState({
        saveUser,
        getUser
    });
    return appState;
};