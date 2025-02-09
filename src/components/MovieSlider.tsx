import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SearchButton from './SearchButton';
import MovieSliderItem from './MovieSliderItem';
import { useVideoStore } from '../store/videoStore';
import { MOVIE_SLIDER_DATA } from '../constants/movies';
import { COLOR } from '../constants/colors';


const { width, height } = Dimensions.get('window');

const MovieSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { videos } = useVideoStore();


  return (
    <View style={styles.container}>
      <SearchButton onClick={() => {}} />

      <FlatList
        ref={flatListRef}
        data={MOVIE_SLIDER_DATA.map(movie => ({
          ...movie,
          ...videos.find(video => video.id === movie.id),
        }))}
        bounces={false}
        renderItem={({ item, index }) => (
          <MovieSliderItem item={item} isActive={index === activeIndex} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {MOVIE_SLIDER_DATA.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height * 0.73,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF99',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 16,
    height: 6,
    backgroundColor: COLOR.primary,
  },
});

export default MovieSlider;
