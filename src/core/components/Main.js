import React from 'react';
import SessionsList from './sessions/SessionsList';
import NewSession from './sessions/NewSession';
import GalleryCamera from './GalleryCamera';
import {StyleSheet, Text} from 'react-native';
import ImageView from './ImageView';
import SessionDetails from './sessions/SessionDetails';
import {tabBarIcons} from '../../configuration';
import ItemDetails from './ItemDetails';
import {Animation} from '../../shared/components/Animation';
import {Icon} from 'native-base';
import {NavDeleteButton} from '../../shared/components/NavDeleteButton';
import {AlertService} from '../../shared/services/alertsService';
import {FirebaseService} from '../../shared/services/firebaseService';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

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

// LoteDetails: {
//   screen: ItemDetails,
//   navigationOptions: {
//     title: 'Detalles del lote',
//   },
// },
// },
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SessionsList"
        component={SessionsList}
        options={{
          tabBarIcon: iconForTab(tabBarIcons['sessions']),
          title: 'Sesiones',
          tabBarLabel: showTitle('Sesiones'),
        }}
      />
      <Tab.Screen
        name="Recent"
        component={Animation}
        options={{
          tabBarIcon: iconForTab(tabBarIcons['recent']),
          title: 'Reciente',
          tabBarLabel: showTitle('Reciente'),
        }}
      />
      <Tab.Screen
        name="GalleryCamera"
        component={GalleryCamera}
        options={{
          tabBarIcon: iconForTab(tabBarIcons['fastProcess']),
          tabBarLabel: showTitle('Proceso rapido'),
          title: 'Proceso rápido',
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{title: 'My app', headerShown: false}}
      />
      <Stack.Screen name="Imagen" component={ImageView} />
      <Stack.Screen
        name="NewSession"
        component={NewSession}
        options={{title: 'Nueva sesión'}}
      />
      <Stack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={({navigation}) => {
          return {
            title: 'Detalles de la sesión',
            headerRight: () => (
              <NavDeleteButton
                onPress={() => {
                  onDeleteSession(
                    navigation.state.initialParams.itemId,
                    navigation,
                  );
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="LoteDetails"
        component={ItemDetails}
        options={{title: 'Detalles del lote'}}
      />
    </Stack.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

function onDeleteSession(sessionId, navigation) {
  AlertService.getInstance()
    .showConfirmDialog(
      '¡Atención! Se eliminará esta sesión y toda la información asociada a ella. ',
    )
    .then(() => {
      FirebaseService.getInstance().removeSession(sessionId);
      navigation.navigate('Main');
      //TODO: actualizar lista de sesiones
    });
}

// const HomeNavigator = createStackNavigator(
//   {
//     Imagen: {
//       screen: ImageView,
//     },
//     Main: {
//       navigationOptions: {
//         headerShown: false,
//       },
//       screen: tabNavigator,
//     },
//     NewSession: {
//       screen: NewSession,
//       navigationOptions: {
//         title: 'Nueva sesión',
//       },
//     },
//     SessionDetails: {
//       screen: SessionDetails,
//       navigationOptions: ({navigation}) => {
//         return {
//           title: 'Detalles de la sesión',
//           headerRight: () => (
//             <NavDeleteButton
//               onPress={() => {
//                 onDeleteSession(navigation.state.params.itemId, navigation);
//               }}
//             />
//           ),
//         };
//       },
//     },
//     LoteDetails: {
//       screen: ItemDetails,
//       navigationOptions: {
//         title: 'Detalles del lote',
//       },
//     },
//   },
//   {
//     initialRouteName: 'Main',
//   },
// );

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
