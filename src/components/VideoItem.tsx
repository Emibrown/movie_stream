import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import WatchNowButton from './WatchNowButton';
import { useFocusEffect } from '@react-navigation/native';
import ActionButton from './ActionButton';
import CustomIcon from './CustomIcon';
import { COLOR } from '../constants/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useVideoStore } from '../store/videoStore';

const { width } = Dimensions.get('window');

// Helper function to format time (e.g., 1:30)
const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const VideoItem = ({ item, videoHeight, isActive, videoProgress }: { item: any; videoHeight: number; isActive: boolean; videoProgress?: number }) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(1);
  const [displayedTime, setDisplayedTime] = useState('0:00');
  const progress = useSharedValue(1);
  const [lastProgress, setLastProgress] = useState(0);
  const isDragging = useSharedValue(0);
  const uiOpacity = useSharedValue(1);
  const { selectedVideoId, setSelectedVideo } = useVideoStore();

  const hideUITimer = useRef<any>(null);

  // Function to reset and restart the auto-hide timer
  const resetUITimer = useCallback(() => {
    uiOpacity.value = withTiming(1, { duration: 300 }); // Show UI
    if (hideUITimer.current) {
      clearTimeout(hideUITimer.current);
    }

    hideUITimer.current = setTimeout(() => {
      uiOpacity.value = withTiming(0, { duration: 500 }); // Hide UI after 3s
    }, 3000);
  }, [uiOpacity]);

  const togglePlayPause = useCallback(() => {
    resetUITimer();
    if(!paused){
      clearTimeout(hideUITimer.current);
    }
    setPaused(!paused);
  }, [paused, resetUITimer]);

  // Handle video load
  const onLoad = (data: { duration: number }) => {
    setLoading(false);
    setDuration(data.duration);
  };

  // Seek to a new position
  const seekTo = (time: number) => {
    videoRef.current?.seek(time);
  };

  // Auto Play when visible
  useFocusEffect(
    useCallback(() => {
      resetUITimer();
      setPaused(!isActive);
      if(selectedVideoId){
        seekTo(videoProgress!);
        setSelectedVideo('');
      }
      return () => setPaused(true);
    }, [isActive, videoProgress, resetUITimer, setSelectedVideo, selectedVideoId])
  );

  const seekVideo = useCallback(() => {
    const newTime = (progress.value / width) * duration;
    videoRef.current?.seek(newTime);
    isDragging.value = withTiming(0, { duration: 300 });
    setLastProgress(progress.value);
    resetUITimer();
    if(paused){
      clearTimeout(hideUITimer.current);
    }
  }, [isDragging, paused, progress.value, duration, resetUITimer]);

  const updateDisplayedTime = useCallback((newProgress: number) => {
    // Update displayed time
    progress.value = newProgress;
    const newTime = Math.floor((newProgress / width) * duration);
    setDisplayedTime(formatTime(newTime));
  }, [duration, progress]);

  // Video Progress Handler
  const onProgress = useCallback((data: any) => {
    if (!isDragging.value) {
      const progressWidth = (data.currentTime / duration) * width;
      progress.value = withTiming(progressWidth, { duration: 200 }); // Smooth progress update
      setLastProgress(progressWidth);
    }
  }, [duration, isDragging.value, progress]);

  // Gesture Handler
  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = withTiming(1, { duration: 150 });
      uiOpacity.value = withTiming(0, { duration: 200 });
    })
    .onUpdate((event) => {
      let newProgress = Math.min(Math.max(0, lastProgress + event.translationX), width);
      runOnJS(updateDisplayedTime)(newProgress);
    })
    .onEnd(() => {
      runOnJS(seekVideo)();
    });

  const progressStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const timeStyle = useAnimatedStyle(() => ({
    opacity: isDragging.value, // Show/hide based on dragging
  }));

  const uiStyle = useAnimatedStyle(() => ({
    opacity: uiOpacity.value,
  }));

  return (
    <View style={[styles.container, {height:videoHeight}]}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUrl }}
        style={[styles.video,{height: videoHeight }]}
        resizeMode="cover"
        repeat
        paused={paused}
        onProgress={(p) => runOnJS(onProgress)(p)}
        onLoadStart={() => setLoading(true)}
        onLoad={onLoad}
      />
      <TouchableOpacity
        style={[styles.paused,{height: videoHeight}]}
        onPress={togglePlayPause}
        activeOpacity={0.7}
      >
      {loading ?
        <ActivityIndicator size={40} color={COLOR.primary} /> :  isActive && paused && <CustomIcon style={{opacity: 0.4}} name="play" size={60} color={'white'} />
      }
      </TouchableOpacity>

      <Animated.View style={[ styles.content, uiStyle]}>
        <View style={styles.des}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.description}>To escape a politically motivated arranged marriage, a privileged heir Lucas...</Text>
          <WatchNowButton onClick={() => {}} />
        </View>
        <View style={styles.actionBar}>
          <ActionButton
            iconName="like"
            onClick={() => setLike(!like)}
            count="11.3K"
            action={like}
            activeColor={COLOR.primary}
          />
          <ActionButton
            iconName="bookmark"
            onClick={() => setBookmark(!bookmark)}
            count={312}
            action={bookmark}
            activeColor="#E5C732"
          />
          <ActionButton
            iconName="share"
            onClick={() => {}}
            count={20}
            action={false}
            activeColor="red"
          />
        </View>
      </Animated.View>


      {/* Time Display (Only Visible When Dragging) */}
      <Animated.Text style={[styles.timeDisplay, timeStyle]}>
        {displayedTime}
      </Animated.Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.track} />
        <Animated.View style={[styles.progress, progressStyle]} />
      </View>
      <GestureDetector gesture={panGesture}>
        <View style={styles.gesture}/>
      </GestureDetector>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
  },
  title:{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  description:{
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 10,
  },
  paused:{
    position: 'absolute',
    top: 20, width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video:{
    width: '100%',
  },
  des:{
    position: 'absolute',
    left: 16,
    gap: 10,
    bottom: 25,
    width: width * 0.75,
  },
  actionBar:{
    position: 'absolute',
    gap: 27,
    right: 16,
    bottom: 38,
  },
  progressContainer: {
    height: 2,
    width: '100%',
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  track: {
    height: 2,
    width: '100%',
    backgroundColor: 'gray',
  },
  progress: {
    height: 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
  },
  content:{
    position: 'absolute',
    bottom: 1,
    width: '100%',
  },
  timeDisplay: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 50,
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gesture:{
    position: 'absolute',
    bottom: 0,
    height: 25,
    width: '100%',
  },
});
