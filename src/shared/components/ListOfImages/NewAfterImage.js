import React, {useRef, useEffect, useContext} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {mainThemeColor, galleryCameraButtons} from '../../../configuration';
import {withImageHandler} from '../HOCForInjection/WithService';
import {withNavigation} from '@react-navigation/compat';
import {DocRefContext} from '../DocRefContext';
import {connect} from 'react-redux';

function NewImage({
  reference,
  images = [],
  docRef,
  style,
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
      docRef,
      beforeId,
      prevImages: images,
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

const mapStateToProps = state => {
  if (state.pastura.data)
    return {images: state.pastura.data.images, docRef: state.pastura.docRef};
  else return {images: state.lote.data?.images, docRef: state.lote.docRef};
};

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

export const NewAfterImage = connect(mapStateToProps)(
  withNavigation(withImageHandler(NewImage)),
);
