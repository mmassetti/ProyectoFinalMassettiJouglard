import React, {useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {BackgroundContext} from './BackgroundContext';
import {useAnimation} from '../services/animations';

export function Background({style}) {
  const {background, setBackground} = useContext(BackgroundContext);
  const [opacity, triggerOpacity, resetOpacity] = useAnimation(0, 150);
  useEffect(() => {
    if (background) {
      triggerOpacity(0.7);
    }
  }, [background]);
  if (background) {
    return (
      <Pressable
        style={[StyleSheet.absoluteFill, {zIndex: 10, ...style}]}
        onPress={() => setBackground(false)}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {opacity, backgroundColor: 'black', zIndex: 10, ...style},
          ]}
        />
      </Pressable>
    );
  } else {
    return null;
  }
}
