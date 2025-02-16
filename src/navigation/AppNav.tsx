import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNav from './MainNav';

const Stack = createNativeStackNavigator();

function AppNav(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainNav"
        screenOptions={{
          animation: 'slide_from_right',
        }}>
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
