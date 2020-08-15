import SessionsList from './sessions/SessionsList';
import NewSession from './NewSession';
import GalleryCamera from './GalleryCamera';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import ImageView from './ImageView';
import SessionDetails from './sessions/SessionDetails';

const iconForTab = icon => ({focused}) => {
  if (focused) {
    return (
      <Icon style={styles.menuiconFocused} type="FontAwesome5" name={icon} />
    );
  } else {
    return <Icon style={styles.menuicon} type="FontAwesome5" name={icon} />;
  }
};

const tabNavigator = createBottomTabNavigator({
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
});

const HomeNavigator = createStackNavigator(
  {
    Imagen: {
      screen: ImageView,
    },
    Main: {
      navigationOptions: {
        headerShown: false,
      },
      screen: tabNavigator,
    },
    NewSession: {
      screen: NewSession,
      navigationOptions: {
        title: 'Nueva sesión',
      },
    },
    SessionDetails: {
      screen: SessionDetails,
      navigationOptions: {
        title: 'Detalles de la sesion',
      },
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
