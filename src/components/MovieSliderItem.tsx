import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video, { VideoRef } from 'react-native-video';
import { useIsFocused} from '@react-navigation/native';
import { FONT } from '../constants/fonts';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const MovieSliderItem = ({
  item,
  isActive,
  setVideoShowing,
  onProgress,
}: {
  item: any;
  isActive: boolean;
  setVideoShowing: SharedValue<number>;
  onProgress?: (progress: number) => void
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const isFocused = useIsFocused();
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [delayComplete, setDelayComplete] = useState(false);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      setDelayComplete(false);
      const delayTimer = setTimeout(() => {
        setDelayComplete(true);
      }, 5000);
      return () => clearTimeout(delayTimer);
    }else{
      setDelayComplete(false);
      setShowVideo(false);
    }
  }, [isActive, setVideoShowing]);

  useEffect(() => {
    if (isFocused && isActive && delayComplete && showVideo) {
      setPaused(false);
      const timer = setTimeout(() => {
        setShowVideo(true);
        opacity.value = withTiming(0, { duration: 1000 });
        setVideoShowing.value = withTiming(0, { duration: 1000 });
      }, 0);
      return () => clearTimeout(timer);
    } else {
      opacity.value = 1;
      setVideoShowing.value = withTiming(1, { duration: 1000 });
      setPaused(true);
    }
  }, [isActive, isFocused, setVideoShowing, delayComplete, showVideo, opacity]);

  const muteAction = useCallback(() => {
    if(showVideo){
      setMuted(!muted);
    }
  }, [muted, showVideo]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity activeOpacity={1} onPress={muteAction}  style={styles.slide}>
      {
        isActive && item.videoUrl && (
          <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            paused={paused}
            repeat
            muted={muted}
            // onLoad={() => {
            //   setShowVideo(true);
            // }}
            onReadyForDisplay={() => setShowVideo(true)}
            controls={false}
            onProgress={(progress) => onProgress && onProgress(progress.currentTime)}
          />
        )
      }
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={item.image} resizeMode="cover" style={styles.image}/>
      </Animated.View>
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
    </TouchableOpacity>
  );
};

export default MovieSliderItem;

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: height * 0.73,
    backgroundColor: 'black',
  },
  imageContainer:{
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  image: {
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
