import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { COLOR } from '../constants/colors';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLOR.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: COLOR.icon,
    fontWeight: '700',
    fontSize: 20,
  },
});
