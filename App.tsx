import React, { useEffect } from 'react';
import AppNav from './src/navigation/AppNav';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <AppNav />
    </GestureHandlerRootView>
  );
}

export default App;
