import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import SearchButton from './SearchButton';
import MovieSliderItem from './MovieSliderItem';
import { useVideoStore } from '../store/videoStore';
import { MOVIE_SLIDER_DATA } from '../constants/movies';
import { COLOR } from '../constants/colors';
import PlayButton from './PlayButton';
import { FONT } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const { height } = Dimensions.get('window');

const MovieSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { videos, setSelectedVideo } = useVideoStore();
  const [movies, setMovies] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation<any>();
  const videoShowing = useSharedValue(1);

  const handleVideoPress = useCallback(() => {
    setSelectedVideo(movies[activeIndex]?.id, currentTime);
    navigation.navigate('Shorts');
  }, [activeIndex,movies, currentTime, navigation, setSelectedVideo]);

  useEffect(() => {
    setMovies(MOVIE_SLIDER_DATA.map(movie => ({
      ...movie,
      ...videos.find(video => video.id === movie.id),
    })));
  }, [videos]);

  const tagsStyle = useAnimatedStyle(() => ({
    opacity: videoShowing.value,
  }));

  return (
    <View style={styles.container}>
      <SearchButton onClick={() => {}} />
      <FlatList
        ref={flatListRef}
        data={movies}
        bounces={false}
        renderItem={({ item, index }) => (
          <MovieSliderItem setVideoShowing={videoShowing} item={item} isActive={index === activeIndex} onProgress={setCurrentTime} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setActiveIndex(index);
        }}
      />

      <View style={styles.content}>
        {/* Categories */}
        <Animated.View style={[styles.categories, tagsStyle]}>
          {movies[activeIndex]?.categories.map((category: any, index: number) => (
            <Text key={index} style={styles.categoryText}>
              {category}
            </Text>
          ))}
        </Animated.View>
        <PlayButton onClick={handleVideoPress} />
      </View>

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
  content:{
    position: 'absolute',
    bottom: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  categories: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 105,
},
categoryText: {
    borderWidth: 1,
    borderColor: '#FFFFFF4D',
    color: '#FFFFFF99',
    fontWeight: '400',
    fontFamily: FONT.inter,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 5,
    borderRadius: 8,
    fontSize: 14,
},
});

export default MovieSlider;
