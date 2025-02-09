import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import WatchNowButton from './WatchNowButton';
import { useFocusEffect } from '@react-navigation/native';
import ActionButton from './ActionButton';
import CustomIcon from './CustomIcon';
import { COLOR } from '../constants/colors';

const { width } = Dimensions.get('window');

const VideoItem = ({ item, videoHeight, isActive, videoProgress }: { item: any; videoHeight: number; isActive: boolean; videoProgress?: number }) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const onProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  // Handle video load
  const onLoad = (data: { duration: number }) => {
    setLoading(false);
    setDuration(data.duration);
  };

  // Seek to a new position

  const seekTo = (time: number) => {
    videoRef.current?.seek(time);
    setCurrentTime(time);
  };

  // Auto Play when visible
  useFocusEffect(
    useCallback(() => {
      setPaused(!isActive);

      if(videoProgress){
        seekTo(videoProgress);
      }

      return () => setPaused(true);
    }, [isActive, videoProgress])
  );


  return (
    <View style={[styles.container, {height:videoHeight}]}>
        <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={[styles.video,{height: videoHeight }]}
            resizeMode="cover"
            repeat
            paused={paused}
            onProgress={onProgress}
            onLoadStart={() => setLoading(true)}
            onLoad={onLoad}
        />
        <TouchableOpacity
            style={[styles.paused,{height: videoHeight}]}
            onPress={togglePlayPause}
            activeOpacity={0.7}
        >
          {loading ?
            <ActivityIndicator size={40} color={'red'} /> :  isActive && paused && <CustomIcon style={{opacity: 0.4}} name="play" size={60} color={'white'} />
          }
        </TouchableOpacity>

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
  progressContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    height: 10,
  },
  track: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF0000',
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
    bottom: 17,
    width: width * 0.75,
  },
  actionBar:{
    position: 'absolute',
    gap: 27,
    right: 16,
    bottom: 28,
  },
});
