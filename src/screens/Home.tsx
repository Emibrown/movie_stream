import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MovieSlider from '../components/MovieSlider';
import Title from '../components/Title';
import SmallMovieCard from '../components/SmallMovieCard';
import LargeMovieCard from '../components/LargeMovieCard';
import CategoryCard from '../components/CategoryCard';
import LinearGradient from 'react-native-linear-gradient';
import { HOME_DATA } from '../constants/movies';

const RenderSection = ({ section }: any) => {
  let RenderItemComponent;

  switch (section.type) {
    case 'continue':
      RenderItemComponent = SmallMovieCard;
      break;
    case 'category':
      RenderItemComponent = CategoryCard;
      break;
    default:
      RenderItemComponent = LargeMovieCard;
      break;
  }

  return (
    <View style={styles.section}>
      <Title name={section.title} />
      <View style={styles.overlayContainer}>
        {/* Left Fade */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          style={styles.leftFade}
        />
        <FlatList
          contentContainerStyle={{paddingHorizontal: 10}}
          data={section.items}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <RenderItemComponent item={item} />}
          nestedScrollEnabled
        />
        {/* Right Fade */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          style={styles.rightFade}
        />
      </View>
    </View>
  );
};


export default function Home() {
  return (
    <FlatList
      style={{backgroundColor: 'black'}}
      data={HOME_DATA}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={MovieSlider}
      renderItem={({ item }) => <RenderSection section={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    backgroundColor: 'black',
  },
  overlayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftFade: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 20,
    zIndex: 1,
  },
  rightFade: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 20,
    zIndex: 1,
  },
});
