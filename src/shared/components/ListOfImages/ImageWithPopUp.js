import {Button} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Popover from 'react-native-popover-view';
import AsyncStorage from '@react-native-community/async-storage';

export function ImageWithPopUp({style, imageId, source}) {
  const [popped, setPopped] = useState(false);
  const [src, setSrc] = useState();
  const triggerPopUp = trigger => () => {
    setPopped(trigger);
  };

  useEffect(() => {
    async function getImage() {
      const locallySavedImage = await AsyncStorage.getItem(imageId);
      setSrc(locallySavedImage || source);
    }
    getImage();
  }, [imageId, source]);
  return (
    <View style={style}>
      <Popover isVisible={popped}>
        <View
          style={{
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.9,
          }}>
          <Image
            source={
              src ? {uri: src} : require('../../../../captures/Default.jpg')
            }
            style={{resizeMode: 'contain', flex: 1}}
          />
          <Button style={styles.button} onPress={triggerPopUp(false)} primary>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Button>
        </View>
      </Popover>
      <TouchableOpacity style={{flex: 1}} onPress={triggerPopUp(true)}>
        <Image style={{resizeMode: 'cover', flex: 1}} source={{uri: src}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
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
