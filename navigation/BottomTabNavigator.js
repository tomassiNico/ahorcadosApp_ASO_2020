import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import { GameScreenWithContext } from '../screens/GameScreen';
import { MenuScreenWithContext } from '../screens/MenuScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Game';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
            name="Menu"
            component={MenuScreenWithContext}
            options={{
                title: 'Menu',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
            }}
        />
      <BottomTab.Screen
        name="Game"
        component={GameScreenWithContext}
        options={{
          title: 'Game',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Game':
      return 'Ahorcado App'
  }
}
