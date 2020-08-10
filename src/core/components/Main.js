import SessionsList from './sessions/SessionsList';
import NewSession from './NewSession';
import GalleryCamera from './GalleryCamera';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const iconForTab = icon => ({focused}) => {
  console.log('icon', icon);
  if (focused) {
    return (
      <Icon style={styles.menuiconFocused} type="FontAwesome5" name={icon} />
    );
    // return <FontAwesomeIcon color="#464646" icon={icon} size={30} />;
  } else {
    return <Icon style={styles.menuicon} type="FontAwesome5" name={icon} />;

    // return <FontAwesomeIcon color="#C6C6C5" icon={icon} size={30} />;
  }
};

const tabNavigator = createBottomTabNavigator(
  {
    SessionsList: {
      navigationOptions: {
        tabBarIcon: iconForTab('list'),
        title: 'Sesiones',
      },
      screen: SessionsList,
    },
    GalleryCamera: {
      navigationOptions: {
        tabBarIcon: iconForTab('camera'),
        title: 'Proceso rápido',
      },
      screen: GalleryCamera,
    },
    NewSession: {
      navigationOptions: {
        tabBarIcon: iconForTab('plus-circle'),
        title: 'Nueva sesión',
      },
      screen: NewSession,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'SessionsList') {
          iconName = 'list';
        } else if (routeName === 'GalleryCamera') {
          iconName = 'camera';
        } else if (routeName === 'NewSession') {
          iconName = 'plus-circle';
        }
        return (
          <Icon style={styles.menuicon} type="FontAwesome5" name={iconName} />
        );
      },
    }),
  },
);

const HomeNavigator = createStackNavigator(
  {
    // Local: {
    //   screen: LocalDetail,
    // },
    Main: {
      navigationOptions: {
        headerShown: false,
      },
      screen: tabNavigator,
    },
  },
  {
    initialRouteName: 'Main',
  },
);

const styles = StyleSheet.create({
  menuiconFocused: {
    // color: 'black',
    color: '#464646',
    fontSize: 30,
  },
  menuiconNotFocused: {
    // color: 'black',
    color: '#C6C6C5',
    fontSize: 30,
  },
});

export default createAppContainer(HomeNavigator);
