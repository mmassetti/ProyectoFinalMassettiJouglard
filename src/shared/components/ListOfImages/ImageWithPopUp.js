import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ImageWithZoom} from '../ImageWithZoom';

export function ImageWithPopUp({style, additionalInfo, imageId, source}) {
  const [popped, setPopped] = useState(false);
  const [src, setSrc] = useState();
  const triggerPopUp = trigger => () => {
    setPopped(trigger);
  };

  useEffect(() => {
    let unmounted = false;
    AsyncStorage.getItem(imageId).then(locallySavedImage => {
      if (!unmounted) setSrc(locallySavedImage || source);
    });
    return () => {
      unmounted = true;
    };
  }, [imageId, source]);
  return (
    <View style={style}>
      <ImageWithZoom
        visible={popped}
        close={triggerPopUp(false)}
        imageToShow={src}
        additionalInfo={additionalInfo}
        heightAdjustment={0.7}
      />
      <TouchableOpacity style={{flex: 1}} onPress={triggerPopUp(true)}>
        <Image style={{resizeMode: 'cover', flex: 1}} source={{uri: src}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginRight: 8,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
