import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { COLOR } from '../constants/colors';
import { FONT } from '../constants/fonts';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={{}}>
      <View style={[styles.container, {paddingBottom: bottom}]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = (
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name
          ) as string;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabBar}>
              <View style={styles.tab}>
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused ? COLOR.primary : COLOR.icon,
                  size: 24,
                })}
                <Text style={[styles.label, {color: isFocused ? COLOR.primary : COLOR.icon}]}>{label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.background,
  },
  tabBar: {
    flex: 1,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONT.inter,
  },
});
