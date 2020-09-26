import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor} from '../../configuration/colors';

export function BottomRightButton({buttons}) {
  return (
    <View style={styles.buttonsContainer}>
      {buttons.map(({type, name, onPress}) => (
        <TouchableOpacity
          key={name}
          onPress={onPress}
          style={styles.resetButton}>
          <Icon
            type={type}
            name={name}
            style={{color: 'white', fontSize: 32}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  resetButton: {
    backgroundColor: mainThemeColor(1),
    marginLeft: 14,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    zIndex: 9,
    elevation: 10,
  },
});
