import { useState, useEffect } from 'react';


export const useAppContext = () => {
    const [userState, setUserState] = useState({
        username: ''
    });

    const saveUser = (username) => {
        setUserState({
          ...appState,
          username
      })
    };

    const getUser = () => {
        return appState.username;
    };

    const [appState, setAppState] = useState({
        ...userState,
        saveUser,
        getUser
    });
    return appState;
};