import React, {useCallback} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CustomIcon from '../components/CustomIcon';
import Shorts from '../screens/Shorts';
import Reward from '../screens/Reward';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

function MainNav(): JSX.Element {
  const IconComponent = useCallback(
    (name: string, color: string, size: number) => (
      <CustomIcon name={name} color={color} size={size} />
    ),
    [],
  );

  const TabBarComponent = useCallback(
    (props: BottomTabBarProps) => <CustomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator tabBar={TabBarComponent} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>
            IconComponent('home', color, size),
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={Shorts}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>
            IconComponent('shorts', color, size),
        }}
      />
      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => IconComponent('reward', color, size),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => IconComponent('profile', color, size),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNav;
