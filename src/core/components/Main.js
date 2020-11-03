import React, {useRef, useState} from 'react';
import SessionsList from './sessions/SessionsList';
import NewSession from './sessions/NewSession';
import GalleryCamera from './GalleryCamera';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ImageAnalysis from './ImageAnalysis';
import SessionDetails from './sessions/SessionDetails';
import {tabBarIcons, mainThemeColor} from '../../configuration';
import LoteDetails from './LoteDetails';
import {Icon} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {PasturasDetail} from './PasturasDetails';
import {Recents} from './Recents';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

const iconForTab = icon => ({focused}) => {
  return (
    <Icon
      style={focused ? styles.menuIconFocused : styles.menuIcon}
      type="FontAwesome5"
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
        component={Recents}
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
          tabBarLabel: showTitle('Proceso rápido'),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

function RootStack(props) {
  const menu = useRef();
  const [showInfo, setShowInfo] = useState(false);

  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  const showMenuInfo = () => {
    setShowInfo(true);
    hideMenu();
  };

  return (
    <Stack.Navigator initialRouteName="Main" gestureEnabled="false">
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{
          title: 'CoverApp',
          headerStyle: {
            elevation: 0,
            backgroundColor: mainThemeColor(1),
          },
          headerTintColor: '#f5f7f7',
          headerRight: () => (
            <View style={styles.headerRightMenu}>
              <Menu
                ref={menu}
                button={
                  <Icon
                    style={styles.menuIcon}
                    type="MaterialIcons"
                    name="menu"
                    onPress={showMenu}
                  />
                }>
                <MenuItem onPress={props.onHideTour(null)}>
                  Ver tutorial
                </MenuItem>
                <MenuItem onPress={showMenuInfo}>Ayuda</MenuItem>
              </Menu>
            </View>
            // <TouchableOpacity onPress={props.onHideTour(null)}>
            //   <Icon
            //     style={styles.menuIcon}
            //     type="FontAwesome5"
            //     name="question-circle"
            //   />
            // </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Imagen" component={ImageAnalysis} />
      <Stack.Screen
        name="NewSession"
        component={NewSession}
        options={{title: 'Nueva sesión'}}
      />
      <Stack.Screen name="SessionDetails" component={SessionDetails} />
      <Stack.Screen name="LoteDetails" component={LoteDetails} />
      <Stack.Screen name="PasturasDetails" component={PasturasDetail} />
    </Stack.Navigator>
  );
}

export default function Main(props) {
  return (
    <NavigationContainer>
      <RootStack onHideTour={props.onHideTour} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuIconFocused: {
    color: '#464646',
    fontSize: 27,
    marginTop: 10,
  },
  menuIcon: {
    color: '#C6C6C5',
    fontSize: 27,
    padding: 10,
  },
  headerRightMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
