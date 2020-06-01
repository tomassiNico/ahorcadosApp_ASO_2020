import React, { useContext } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './src/Home/screen/MenuScreen';
import {GameScreenWithContext} from './src/Game/screens/GameScreen';
import LoginScreen from './src/Login/screens/LoginScreen';
import useLinking from './navigation/useLinking';
import {AppProvider, store} from './src/Shared/providers/appProvider';
import Notifications from './src/Home/components/Notifications';
import Logout from "./src/Home/components/Logout";
import VersusScreen from './src/Game/screens/VersusScreen';
const Stack = createStackNavigator();

const Navigator = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const globalData = useContext(store);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator initialRouteName={"MenuScreen"}>
                {!globalData.state.username ? (
                  <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                  <>
                  <Stack.Screen
                      name="Menu"
                      component={MenuScreen}
                      options={({ navigation }) => ({
                        headerRight: () => (
                            <View>
                              <Logout/>
                              <Notifications navigation={navigation}/>
                            </View>),
                      })}
                  />
                  <Stack.Screen name="Game" component={GameScreenWithContext} />
                  <Stack.Screen name="VS" component={VersusScreen} />
                  </>
                )}
                </Stack.Navigator>
              </NavigationContainer>
          </View>
    );
  }
}

export default function App(props) {
  return (
    <AppProvider>
      <Navigator {...props}/>
    </AppProvider>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
