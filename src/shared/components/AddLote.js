import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {
  mainThemeColor,
  successThemeColor,
  warnThemeColor,
} from '../../configuration/colors';

export function AddLote({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.container, backgroundColor: mainThemeColor(0.2)}}>
      <Icon name="squared-plus" style={styles.addIcon} type="Entypo" />
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
    backgroundColor: successThemeColor(0.2),
  },
});