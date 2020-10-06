import React, {useContext} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor} from '../../configuration/colors';
import {Background} from './BackgroundFull';
import {BackgroundContext} from './BackgroundContext';

export function BottomRightButton({buttons, withBackground = false}) {
  const {background} = useContext(BackgroundContext);
  return (
    <View
      style={[
        styles.buttonsContainer,
        withBackground ? {backgroundColor: 'rgba(255,255,255,0.8)'} : {},
      ]}>
      {buttons.map(({type, name, onPress}) => (
        <TouchableOpacity
          key={name}
          onPress={onPress}
          style={[styles.resetButton, background ? {elevation: 0} : {}]}>
          <Icon
            type={type}
            name={name}
            style={{color: 'white', fontSize: 32}}
          />
        </TouchableOpacity>
      ))}
      <Background style={{borderRadius: 10}} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    zIndex: 7,
    padding: 10,
    borderRadius: 10,
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
