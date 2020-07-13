import React, {PureComponent} from 'react';
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

const Stack = createStackNavigator();
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  async componentDidMount() {
    let oldUser = await AsyncStorage.getItem('@OldUser');
    this.setState({
      showRealApp: oldUser,
    });
  }

  hideTour = show => () => {
    this.setState({showRealApp: show});
    AsyncStorage.setItem('@OldUser', 'true');
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <Main />

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
}

const styles = StyleSheet.create({
  menuicon: {
    color: '#f5f7f7',
    fontSize: 24,
    marginRight: 20,
  },
});

export default App;
