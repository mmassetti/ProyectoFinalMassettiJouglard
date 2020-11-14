import React from 'react';
import {Text} from 'react-native';
import {warnThemeColor} from '../../configuration/colors';

export function NetStatusBar() {
  return (
    <Text
      style={{
        backgroundColor: warnThemeColor(0.9),
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
      Trabajando sin conexión
    </Text>
  );
}
