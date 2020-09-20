import React, {useState, useRef} from 'react';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {mix, onGestureEvent, useTransition} from 'react-native-redash';
import {Text, Animated, TouchableOpacity, View, Dimensions} from 'react-native';
import {interpolate} from 'react-native-reanimated';

export function Animation() {
  const positionFirstBox = useRef(new Animated.Value(0)).current;
  const view = useRef();
  const positionSecondBox = useRef(new Animated.Value(0)).current;
  const xTranslation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = () => {
    console.log(view.current.viewConfig);
    view.current.measure((ox, oy, width, height, px, py) => {
      console.log(px, '----', py);
      Animated.timing(positionSecondBox, {
        toValue: Dimensions.get('window').height / 2 - py,
        duration: 400,
        useNativeDriver: true,
      }).start();
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 400,
        useNativeDriver: true,
      }).start();
      Animated.timing(xTranslation, {
        toValue: -10,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };
  const reset = () => {
    Animated.timing(positionSecondBox, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(xTranslation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{paddingTop: 500}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={reset}
        style={{
          top: 0,
          bottom: -Dimensions.get('window').height,
          right: 0,
          zIndex: 1,
          left: 0,
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      />
      <TouchableOpacity activeOpacity={0.8} style={{}} onPress={translateX}>
        <Animated.View
          style={{
            zIndex: 99,
            alignSelf: 'center',
            width: '70%',
            height: 100,
            backgroundColor: 'black',
            transform: [{translateY: positionSecondBox, scale}],
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Prueba
          </Text>
        </Animated.View>
        <Animated.View
          ref={view}
          style={{
            zIndex: 1,
            position: 'relative',
            top: -80,
            right: -10,
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '70%',
            height: 100,
            transform: [
              {translateY: positionSecondBox, translateX: xTranslation, scale},
            ],
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Prueba
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
