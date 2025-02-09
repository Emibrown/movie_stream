import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video, { VideoRef } from 'react-native-video';
import PlayButton from './PlayButton';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useVideoStore } from '../store/videoStore';
import { FONT } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

const MovieSliderItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
  const [showVideo, setShowVideo] = useState(false);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const { setSelectedVideo } = useVideoStore();
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<VideoRef>(null);


  useEffect(() => {
    if (isFocused && isActive) {
      setShowVideo(false);

      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
  }, [isActive, isFocused]);

  const handleVideoPress = () => {
    setSelectedVideo(item.id, currentTime);
    navigation.navigate('Shorts');
  };

  return (
    <View style={styles.slide}>
        {isActive && showVideo && item.videoUrl ? (
            <Video
                ref={videoRef}
                source={{ uri: item.videoUrl }}
                style={styles.video}
                resizeMode="cover"
                repeat
                muted
                controls={false}
                onProgress={(progress) => setCurrentTime(progress.currentTime)}
            />
        ) : (
            <Image source={item.image} resizeMode="cover" style={styles.image}/>
        )}
        <View style={styles.content}>
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,1)']} style={styles.gradient} />
            {/* Categories */}
            <View style={styles.categories}>
            {item.categories.map((category: any, index: number) => (
                <Text key={index} style={styles.categoryText}>
                {category}
                </Text>
            ))}
            </View>

            <PlayButton onClick={handleVideoPress} />
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
});
