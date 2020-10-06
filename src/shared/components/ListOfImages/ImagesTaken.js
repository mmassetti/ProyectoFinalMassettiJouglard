import React, {useState, useContext} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import {OverlappingEntries} from './OverlappingImages';
import {Background} from '../BackgroundFull';
import {BackgroundContext} from '../BackgroundContext';

export function ImagesTaken({images}) {
  const {background, setBackground} = useContext(BackgroundContext);
  return (
    <ScrollView style={{minHeight: '100%'}}>
      <Background />
      <View
        style={{
          minHeight: Dimensions.get('screen').height * 0.7,
        }}>
        {images.map((item, key) => {
          return <OverlappingEntries key={key} item={item} />;
        })}
      </View>
      <View style={{height: 90}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageTitle: {
    textAlign: 'center',
    fontSize: 19,
    marginBottom: 15,
  },
  fullScreen: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 10,
  },
});
