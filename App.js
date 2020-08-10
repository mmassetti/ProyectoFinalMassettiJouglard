import stateReducer from './src/core/reducers/stateReducer';
import React, {useState, useEffect, useReducer} from 'react';
import {Tour} from './src/guided-tour/Tour';
import {Icon} from 'native-base';
import {Home} from './src/core/components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageView} from './src/core/components/ImageView';
import AsyncStorage from '@react-native-community/async-storage';
import {mainThemeColor} from './src/configuration';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {GalleryCamera} from './src/core/components/GalleryCamera';
import Main from './src/core/components/Main';
import StateContext from './src/core/context/StateContext';

const Stack = createStackNavigator();
function App() {
  const [state, dispatcher] = useReducer(stateReducer, {});
  const [showRealApp, setShowApp] = useState(false);

  useEffect(async () => {
    let oldUser = await AsyncStorage.getItem('@OldUser');
    this.setState({
      showRealApp: oldUser,
    });
  }, []);

  const hideTour = show => () => {
    setShowApp(show);
    AsyncStorage.setItem('@OldUser', 'true');
  };

  if (this.state.showRealApp) {
    return (
      <StateContext.Provider value={{state, dispatcher}}>
        <Main />
      </StateContext.Provider>
      //   <NavigationContainer>
      //     <Stack.Navigator
      //       initialRouteName="Home"
      //       screenOptions={{
      //         headerStyle: {
      //           elevation: 0,
      //           backgroundColor: mainThemeColor(1),
      //         },
      //         headerTintColor: '#f5f7f7',
      //         headerRight: () => (
      //           <TouchableOpacity onPress={this.hideTour(null)}>
      //             <Icon
      //               style={styles.menuicon}
      //               type="FontAwesome5"
      //               name="question-circle"
      //             />
      //           </TouchableOpacity>
      //         ),
      //       }}>
      //       <Stack.Screen
      //         name="Home"
      //         component={Home}
      //         options={{title: 'Inicio'}}
      //       />
      //       <Stack.Screen
      //         name="Imagen"
      //         component={ImageView}
      //         options={{
      //           title: 'Imagen',
      //         }}
      //       />
      //       <Stack.Screen
      //         name="GalleryCamera"
      //         component={GalleryCamera}
      //         options={{
      //           title: 'Procesar imagen',
      //         }}
      //       />
      //     </Stack.Navigator>
      //   </NavigationContainer>
    );
  } else {
    if (this.state.showRealApp === false) {
      return null;
    } else {
      return <Tour onDone={this.hideTour(true)} />;
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
