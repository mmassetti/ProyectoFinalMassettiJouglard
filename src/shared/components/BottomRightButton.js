import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor} from '../../configuration/colors';

export function BottomRightButton({type, name, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.resetButton}>
      <Icon type={type} name={name} style={{color: 'white', fontSize: 32}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: mainThemeColor(1),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    zIndex: 99,
  },
});
