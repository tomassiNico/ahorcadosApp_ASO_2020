import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './screens/MenuScreen';
import {GameScreenWithContext} from './screens/GameScreen';
import LoginScreen from './screens/LoginScreen';
import useLinking from './navigation/useLinking';
import {AppProvider} from './providers/appProvider';
import Notifications from './components/Notifications';
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

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
            <AppProvider>
              <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator initialRouteName={"MenuScreen"}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                      name="Menu"
                      component={MenuScreen}
                      options={({ navigation }) => ({headerRight: () => (<Notifications/>)})}
                  />
                  <Stack.Screen name="Game" component={GameScreenWithContext} />
                </Stack.Navigator>
              </NavigationContainer>
            </AppProvider>

          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
