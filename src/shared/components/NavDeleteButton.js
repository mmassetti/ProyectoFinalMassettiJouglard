import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export function NavDeleteButton({type, name, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.resetButton}>
      <Icon type={type} name={name} style={{color: 'red'}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    // backgroundColor: warnThemeColor(1),
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 60,
    // width: 60,
    // zIndex: 99,
  },
});
