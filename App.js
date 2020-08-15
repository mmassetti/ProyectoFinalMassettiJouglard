import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import Main from './src/core/components/Main';
import {Tour} from './src/guided-tour/Tour';
import {OurSpinner} from './src/core/components/Spinner';
import {Provider} from 'react-redux';
import {store} from './src/store';

function App() {
  const [showRealApp, setShowApp] = useState(false);
  const [spinner, setSpinner] = useState(false);

  store.subscribe(() => {
    const {spinner} = store.getState();
    setSpinner(spinner);
  });

  useEffect(async () => {
    let oldUser = await AsyncStorage.getItem('@OldUser');
    setShowApp(oldUser);
    return null;
  }, []);

  const hideTour = show => () => {
    setShowApp(show);
    AsyncStorage.setItem('@OldUser', 'true');
  };

  if (showRealApp) {
    return (
      <Provider store={store}>
        <Main />
        <OurSpinner show={spinner} />
      </Provider>
    );
  } else {
    if (showRealApp === false) {
      return null;
    } else {
      return <Tour onDone={hideTour(true)} />;
    }
  }
}

export default App;
