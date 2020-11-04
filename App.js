import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import Main from './src/core/components/Main';
import prompt from 'react-native-prompt-android';
import {Tour} from './src/guided-tour/Tour';
import {OurSpinner} from './src/core/components/Spinner';
import {Provider} from 'react-redux';
import {store} from './src/store';
import NetInfo from '@react-native-community/netinfo';
import {NetStatusBar} from './src/shared';
import {setUser} from './src/store/actions';
import firestore from '@react-native-firebase/firestore';

function App() {
  const [showRealApp, setShowApp] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [netStatus, setNetStatus] = useState(true);
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (!netStatus) {
      firestore().disableNetwork();
    } else {
      firestore().enableNetwork();
    }
  });

  NetInfo.addEventListener(state => {
    if (netStatus !== state.isConnected) {
      setNetStatus(state.isConnected);
    }
  });

  store.subscribe(() => {
    const {spinner, userName} = store.getState();
    setSpinner(spinner);
    setUserName(userName);
  });

  useEffect(() => {
    async function isOldUser() {
      let oldUser = await AsyncStorage.getItem('@OldUser');
      setShowApp(oldUser);
    }
    isOldUser();
  }, []);

  useEffect(() => {
    async function getUserName() {
      let userName = await AsyncStorage.getItem('@UserName');
      if (!userName) {
        prompt(
          'Ingrese un nombre de usuario',
          '',
          [
            {
              text: 'Confirmar',
              onPress: name => {
                AsyncStorage.setItem('@UserName', name);
                store.dispatch(setUser(name));
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      } else {
        store.dispatch(setUser(userName));
      }
    }
    getUserName();
  }, [userName]);

  const hideTour = show => () => {
    setShowApp(show);
    AsyncStorage.setItem('@OldUser', 'true');
  };

  if (showRealApp) {
    return (
      <Provider store={store}>
        {!netStatus ? <NetStatusBar /> : null}
        <Main onHideTour={hideTour} />
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
