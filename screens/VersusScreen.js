import React, { useState,  useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import singletonFirebaseServices from '../repositories/firebaseService';
import WordServices from '../repositories/WordServices';
import {store} from "../providers/appProvider";

const VersusScreen = (props) => {
  const [users, setUsers] = useState([]);
  const globalState = useContext(store);

  
  useEffect(() => {
    const fetchData = async  () => {
      let usersData  = await singletonFirebaseServices.fetchUsers();
      usersData.filter(({username}) => username !== globalState.state.username);
      setUsers(usersData);
    }
    fetchData();
  },[])

  _onSelectUser = async (username) => {
      try{
          const word = await WordServices.getWord();
          const gameData = {
              word,
              username1: globalState.state.username,
              username2: username,
              time1: null,
              time2: null,
              state1: null,
              state2: null,
              winner: '',
          }
          const idGame = (new Date()).getTime().toString();
          const game = await singletonFirebaseServices.createVersusGame(idGame, {...gameData, idGame});
          props.navigation.navigate('Game', { game: game, isVersus: true, word,  username1: globalState.state.username, username2: username })
      }catch(err){
        console.log('Error inesperado', err)
      }
  }

  

  return (
    <View style={{  marginHorizontal: 8 }}>
      <Text style={{ fontSize: 24}}>Jugar contra: </Text>
      {users.map(({username})=>{
        return  (
          <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            marginHorizontal: 8,
            marginVertical: 8
          }}
          onPress={() => _onSelectUser(username)}
        >
          <Text >{username}</Text>
        </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default VersusScreen