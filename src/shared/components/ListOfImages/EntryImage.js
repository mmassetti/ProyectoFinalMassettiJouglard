// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
import {
  mainThemeColor,
  warnThemeColor,
  percentages,
} from '../../../configuration';
import {ImageWithPopUp} from './ImageWithPopUp';
import {useAnimation} from '../../services/animations';
import {Icon} from 'native-base';

export function OurImage({
  onPress,
  opened,
  reference,
  deleteImage,
  image,
  style,
  text,
  isBefore,
}) {
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
          source={image.uri}
          style={styles.image}
          additionalInfo={() => (
            <View style={{padding: 15}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                Anotaciones
              </Text>
              <Text>{image.note}</Text>
            </View>
          )}
        />
        <TouchableNativeFeedback
          style={{
            flex: 3,
            flexDirection: 'row',
          }}
          onPress={onPress}>
          <View
            style={[
              styles.circlesContainer,
              {
                borderTopRightRadius: !opened ? 6 : 0,
                borderBottomEndRadius: !opened ? 6 : 0,
              },
            ]}>
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
        <TouchableOpacity
          onPress={deleteImage(isBefore)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: !opened ? 'transparent' : '#fafafa',
            flex: 1,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          }}>
          {isBefore || opened ? (
            <Icon
              type="FontAwesome5"
              name="trash"
              style={{
                color: warnThemeColor(1),
                fontSize: 26,
                transform: [{translateX: !opened ? 8 : 0}],
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  circlesContainer: {
    flex: 6,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: mainThemeColor(1),
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    flex: 2,
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
