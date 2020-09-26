// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
import {mainThemeColor, percentages} from '../../configuration';
import {ImageWithPopUp} from './ImageWithPopUp';
import {useAnimation} from '../services/animations';

export function OurImage({onPress, reference, image, style, text}) {
  const formatText = progress => () => {
    return `${progress}%`;
  };
  const refer = useRef();
  useEffect(() => {
    reference(refer);
  });

  useEffect(() => {
    if (text) triggerOpacity(1);
    else resetOpacity();
  }, [text]);

  const [opacity, triggerOpacity, resetOpacity] = useAnimation(0, 300);
  return (
    <Animated.View ref={refer} style={style}>
      <Animated.Text style={[styles.titleEntry, {opacity: opacity}]}>
        {text}
      </Animated.Text>
      <View style={styles.container}>
        <ImageWithPopUp
          imageId={image.id}
          source={image.url}
          style={styles.image}
        />
        <TouchableNativeFeedback
          style={{
            flex: 3,
            flexDirection: 'row',
          }}
          onPress={onPress}>
          <View style={styles.circlesContainer}>
            {percentages.map((percentage, index) => {
              return (
                <ProgressCircle
                  key={index}
                  thickness={7}
                  color={percentage.color}
                  progress={
                    image.percentages[`percentage${percentage.type}`] / 100
                  }
                  size={Dimensions.get('window').width * 0.15}
                  textStyle={{fontSize: 14}}
                  showsText={true}
                  formatText={formatText(
                    image.percentages[`percentage${percentage.type}`],
                  )}
                />
              );
            })}
          </View>
        </TouchableNativeFeedback>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  circlesContainer: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: mainThemeColor(1),
    paddingTop: 10,
    paddingBottom: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    alignSelf: 'center',
    maxWidth: Dimensions.get('window').width,
  },
  titleEntry: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 18,
  },
});
