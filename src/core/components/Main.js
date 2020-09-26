import SessionsList from './sessions/SessionsList';
import NewSession from './sessions/NewSession';
import GalleryCamera from './GalleryCamera';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import ImageView from './ImageView';
import SessionDetails from './sessions/SessionDetails';
import {tabBarIcons} from '../../configuration';
import ItemDetails from './ItemDetails';
import {Animation} from '../../shared/components/Animation';

const iconForTab = icon => ({focused}) => {
  return (
    <Icon
      style={focused ? styles.menuIconFocused : styles.menuIcon}
      {...icon}
    />
  );
};

const showTitle = title => ({focused}) => {
  if (focused) {
    return <Text style={{textAlign: 'center', fontSize: 13}}>{title}</Text>;
  } else {
    return <Text style={{display: 'none'}} />;
  }
};
const tabNavigator = createBottomTabNavigator({
  SessionsList: {
    navigationOptions: {
      tabBarIcon: iconForTab(tabBarIcons['sessions']),
      title: 'Sesiones',
      tabBarLabel: showTitle('Sesiones'),
    },
    screen: SessionsList,
  },
  Recent: {
    navigationOptions: {
      tabBarIcon: iconForTab(tabBarIcons['recent']),
      title: 'Reciente',
      tabBarLabel: showTitle('Reciente'),
    },
    screen: Animation,
  },
  GalleryCamera: {
    navigationOptions: {
      tabBarIcon: iconForTab(tabBarIcons['fastProcess']),
      tabBarLabel: showTitle('Proceso rapido'),
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
    LoteDetails: {
      screen: ItemDetails,
      navigationOptions: {
        title: 'Detalles del lote',
      },
    },
  },
  {
    initialRouteName: 'Main',
  },
);

const styles = StyleSheet.create({
  menuIconFocused: {
    // color: 'black',
    color: '#464646',
    fontSize: 27,
    marginTop: 10,
  },
  menuIcon: {
    // color: 'black',
    color: '#C6C6C5',
    fontSize: 27,
  },
});

export default createAppContainer(HomeNavigator);
