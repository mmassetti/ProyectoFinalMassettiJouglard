import SessionsList from './sessions/SessionsList';
import NewSession from './sessions/NewSession';
import GalleryCamera from './GalleryCamera';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import ImageView from './ImageView';
import SessionDetails from './sessions/SessionDetails';
import {tabBarIcons} from '../../configuration';
import {Icon} from 'native-base';
import {NavDeleteButton} from '../../shared/components/NavDeleteButton';
import {AlertService} from '../../shared/services/alertsService';
import {FirebaseService} from '../../shared/services/firebaseService';

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
    screen: SessionsList,
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

function onDeleteSession(sessionId) {
  AlertService.getInstance()
    .showConfirmDialog(
      '¡Atención! Se eliminará esta sesión y toda la información asociada a ella. ',
    )
    .then(() => {
      FirebaseService.getInstance().removeSession(sessionId);
      //TODO: Refrescar vista
    });
}

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
      navigationOptions: ({navigation}) => {
        return {
          title: 'Detalles de la sesión',
          headerRight: () => (
            <NavDeleteButton
              onPress={() => {
                onDeleteSession(navigation.state.params.itemId);
              }}
            />
          ),
        };
      },
    },
  },
  {
    initialRouteName: 'Main',
  },
);

const styles = StyleSheet.create({
  menuIconFocused: {
    color: '#464646',
    fontSize: 27,
    marginTop: 10,
  },
  menuIcon: {
    color: '#C6C6C5',
    fontSize: 27,
  },
});

export default createAppContainer(HomeNavigator);
