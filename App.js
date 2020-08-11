import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet} from 'react-native';
import Main from './src/core/components/Main';
import StateContext from './src/core/context/StateContext';
import stateReducer from './src/core/reducers/stateReducer';
import {Tour} from './src/guided-tour/Tour';

const Stack = createStackNavigator();
function App() {
  const [state, dispatcher] = useReducer(stateReducer, {});
  const [showRealApp, setShowApp] = useState(false);

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
      <StateContext.Provider value={{state, dispatcher}}>
        <Main />
      </StateContext.Provider>
    );
  } else {
    if (showRealApp === false) {
      return null;
    } else {
      return <Tour onDone={hideTour(true)} />;
    }
  }
}

const styles = StyleSheet.create({
  menuicon: {
    color: '#f5f7f7',
    fontSize: 24,
    marginRight: 20,
  },
});

export default App;
