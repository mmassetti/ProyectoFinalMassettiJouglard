import React from 'react';
import {View, StyleSheet} from 'react-native';

export function Separator() {
  return <View style={style.separator} />;
}

const style = StyleSheet.create({
  separator: {
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 10,
  },
});
