import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor} from '../../../configuration/colors';

export function AddEntry({onPress, text}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="squared-plus" style={styles.addIcon} type="Entypo" />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addIcon: {
    fontSize: 48,
  },
  container: {
    paddingTop: '20%',
    paddingBottom: '20%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: mainThemeColor(0.2),
  },
});
