import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor, galleryCameraButtons} from '../../configuration';
import {withImagePicker} from '../components/HOCForInjection/WithService';

function NewImage({reference, style, imagePicker}) {
  const ref = useRef(null);
  useEffect(() => {
    reference(ref);
  });
  const launch = picker => async () => {
    try {
      const {uri, data, width, height} = await imagePicker[
        'getImageFrom' + picker
      ]();
      let imgModel = new ImageModel(data, height, width, uri);
      routeToImageView(imgModel);
    } catch (error) {}
  };
  return (
    <Animated.View ref={ref} style={[style, styles.container]}>
      {galleryCameraButtons.map(button => {
        return (
          <>
            <TouchableOpacity onPress={launch(button.type)}>
              <Icon {...button.icon} style={styles.icon} />
            </TouchableOpacity>
          </>
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

export const NewAfterImage = withImagePicker(NewImage);
