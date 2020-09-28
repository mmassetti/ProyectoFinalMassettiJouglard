import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';

export function useAnimation(initialValue, duration) {
  const animation = useRef(new Animated.Value(initialValue)).current;
  const trigger = (dest, callback) => {
    Animated.timing(animation, {
      toValue: dest,
      duration,
      useNativeDriver: true,
    }).start(callback);
  };
  const reset = callback => {
    Animated.timing(animation, {
      toValue: initialValue,
      duration,
      useNativeDriver: true,
    }).start(callback);
  };

  return [animation, trigger, reset];
}

export function calculateOffsetToMiddleOfTheScreen(initialOffset) {
  return Dimensions.get('window').height / 2 - initialOffset;
}
