import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {warnThemeColor} from '../../configuration/colors';

export function NavDeleteButton({onPress}) {
  return (
    <TouchableOpacity transparent style={styles.deleteButton} onPress={onPress}>
      <Icon
        type="FontAwesome"
        name="trash"
        style={{color: warnThemeColor(0.7), fontSize: 22}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
});
