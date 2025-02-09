import React, { useEffect } from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import { useVideoStore } from '../store/videoStore';
import { NavigationProp } from '@react-navigation/native';
import { COLOR } from '../constants/colors';

export default function Setup({navigation}: {navigation: NavigationProp<any, any>}) {
  const { fetchVideos, loading } = useVideoStore();

  useEffect(() => {
    if(loading){
      fetchVideos();
    }else{
      navigation.navigate('MainNav');
    }
  }, [fetchVideos, loading, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />
      <ActivityIndicator size={60} color={COLOR.primary} />
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
});
