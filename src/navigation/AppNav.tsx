import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNav from './MainNav';
import Setup from '../screens/Setup';

const Stack = createNativeStackNavigator();

function AppNav(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Setup"
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Setup"
          component={Setup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainNav"
          component={MainNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
