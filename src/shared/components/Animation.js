import React, {useState, useRef} from 'react';
import {Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

function Texto1() {
  return <Text>Texto 1</Text>;
}
function Texto2() {
  return <Text>Texto 2</Text>;
}

export function Animation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Primero'},
    {key: 'second', title: 'Segundo'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'black'}}
        style={{backgroundColor: 'rgba(0,0,0,0)', elevation: 0}}
        labelStyle={{color: 'black', fontSize: 16}}
      />
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      renderScene={SceneMap({first: Texto1, second: Texto2})}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
}
