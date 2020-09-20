import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';

export function useAnimation(initialValue, dest, duration) {
  const animation = useRef(new Animated.Value(initialValue)).current;
  const trigger = () => {
    Animated.timing(animation, {
      toValue: dest,
      duration,
      useNativeDriver: true,
    }).start();
  };
  const reset = () => {
    Animated.timing(animation, {
      toValue: initialValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return [animation, trigger, reset];
}

export function calculateOffsetToMiddleOfTheScreen(initialOffset) {
  return Dimensions.get('window').height / 2 - initialOffset;
}
