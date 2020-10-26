import React, {useState, useEffect} from 'react';
import {Text, Dimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {mainThemeColor} from '../../configuration';
import {Background} from './BackgroundFull';

export function Tabs({firstTitle, secondTitle, FirstScreen, SecondScreen}) {
  useEffect(() => {
    setRoutes([
      {key: 'first', title: firstTitle},
      {key: 'second', title: secondTitle},
    ]);
  }, [firstTitle, secondTitle]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'first', title: firstTitle},
    {key: 'second', title: secondTitle},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return FirstScreen();
      case 'second':
        return SecondScreen();
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    return (
      <View>
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: mainThemeColor(1), height: 3}}
          style={{backgroundColor: 'rgba(0,0,0,0)', elevation: 0}}
          labelStyle={{color: mainThemeColor(1), fontSize: 16}}
        />
        <Background />
      </View>
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
}
