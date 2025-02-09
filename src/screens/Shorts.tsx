import React, { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import VideoItem from '../components/VideoItem';
import SearchButton from '../components/SearchButton';
import { useVideoStore } from '../store/videoStore';
import { useFocusEffect } from '@react-navigation/native';
import { COLOR } from '../constants/colors';


const Shorts = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const { selectedVideoId, videoProgress, videos, setSelectedVideo } = useVideoStore();
  const [height, setHeight] = useState(0);
  const listRef = useRef<FlatList<any>>(null);
  const [isListRendered, setIsListRendered] = useState(false);

  const onViewableItemsChanged = useCallback(({ viewableItems } : { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveVideo(viewableItems[0]?.item?.id);
    }
  }, []);

  // Auto Play when visible
  useFocusEffect(
    useCallback(() => {
      if (isListRendered && listRef.current && selectedVideoId) {
        const index = videos.findIndex((v) => v.id === selectedVideoId);
        if (index !== -1) {
          listRef.current?.scrollToIndex({ index, animated: true });
          setSelectedVideo('');
        }
      }
      return () => {};
    }, [selectedVideoId, isListRendered, videos, setSelectedVideo])
  );

  return (
    <View style={styles.container} onLayout={(event) => {
      setHeight(event.nativeEvent.layout.height);
    }}>
       <SearchButton onClick={() => {}} />
       <FlatList
        ref={listRef}
        data={videos}
        bounces={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoItem item={item} videoHeight={height} videoProgress={videoProgress!} isActive={activeVideo === item.id} />
        )}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewableItemsChanged}
        onLayout={() => setIsListRendered(true)} // List is now rendered
      />
    </View>
  );
};

export default Shorts;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: COLOR.background,
    },
});
