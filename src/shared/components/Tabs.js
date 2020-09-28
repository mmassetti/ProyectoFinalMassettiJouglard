import React, {useState, useRef} from 'react';
import {Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {mainThemeColor} from '../../configuration';

export function Tabs({firstTitle, secondTitle, FirstScreen, SecondScreen}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: firstTitle},
    {key: 'second', title: secondTitle},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: mainThemeColor(1), height: 3}}
        style={{backgroundColor: 'rgba(0,0,0,0)', elevation: 0}}
        labelStyle={{color: mainThemeColor(1), fontSize: 16}}
      />
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      renderScene={SceneMap({first: FirstScreen, second: SecondScreen})}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
}
