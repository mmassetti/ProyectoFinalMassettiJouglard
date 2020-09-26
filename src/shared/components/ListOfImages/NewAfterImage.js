import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor, galleryCameraButtons} from '../../configuration';
import {withImageHandler} from '../components/HOCForInjection/WithService';
import {withNavigation} from 'react-navigation';

function NewImage({
  reference,
  style,
  itemId,
  navigation,
  beforeId,
  imageHandler,
}) {
  const ref = useRef(null);
  useEffect(() => {
    reference(ref);
  });
  const launch = picker => async () => {
    const imageResponse = await imageHandler.pickImage({
      collectionName: 'lotesDetails',
      itemId,
      beforeId,
    })(picker);
    navigation.navigate('Imagen', imageResponse);
  };
  return (
    <Animated.View ref={ref} style={[style, styles.container]}>
      {galleryCameraButtons.map(button => {
        return (
          <React.Fragment key={button.type}>
            <TouchableOpacity onPress={launch(button.type)}>
              <Icon {...button.icon} style={styles.icon} />
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b1c8cd',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    fontSize: 48,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginVertical: 5,
    borderRadius: 10,
    color: mainThemeColor(1),
  },
});

export const NewAfterImage = withNavigation(withImageHandler(NewImage));