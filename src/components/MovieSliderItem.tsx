import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video, { VideoRef } from 'react-native-video';
import { useIsFocused} from '@react-navigation/native';
import { FONT } from '../constants/fonts';
import { COLOR } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const MovieSliderItem = ({ item, isActive, onProgress }: { item: any; isActive: boolean; onProgress?: (progress: number) => void}) => {
  const [showVideo, setShowVideo] = useState(false);
  const isFocused = useIsFocused();
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(false);
  // const fadeAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: isActive ? 1 : 0, // Fade in when active, fade out otherwise
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // }, [isActive, fadeAnim]);

  useEffect(() => {
    if (isFocused && isActive) {
      setShowVideo(false);
      setPaused(false);
      videoRef.current?.seek(0);
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
      setPaused(true);
    }
  }, [isActive, isFocused]);

  return (
    <View style={styles.slide}>
      {
        isActive && item.videoUrl && (
          <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            paused={paused}
            repeat
            muted
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            controls={false}
            onProgress={(progress) => onProgress && onProgress(progress.currentTime)}
          />
        )
      }
      {
        loading && <View style={styles.loader}>
        <ActivityIndicator size={20} color={COLOR.primary} />
      </View>
      }
      {!showVideo && (
        <Image source={item.image} resizeMode="cover" style={styles.image}/>
      )}
      <View style={styles.content}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,1)']} style={styles.gradient} />

        {/* <Animated.View style={[styles.categories, { opacity: fadeAnim }]}>
          {item.categories.map((category: any, index: number) => (
            <Text key={index} style={styles.categoryText}>
            {category}
            </Text>
          ))}
        </Animated.View> */}
      </View>
    </View>
  );
};

export default MovieSliderItem;

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: height * 0.73,
    backgroundColor: 'black',
  },
  image: {
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  video:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content:{
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
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
  loader:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    opacity: 0.7,
  },
});
