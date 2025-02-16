import React, { useEffect } from 'react';
import AppNav from './src/navigation/AppNav';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useVideoStore } from './src/store/videoStore';

function App(): React.JSX.Element {
  const { fetchVideos, loading } = useVideoStore();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      if(loading){
        fetchVideos();
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [fetchVideos, loading]);

  return (
    <GestureHandlerRootView>
      <AppNav />
    </GestureHandlerRootView>
  );
}

export default App;
