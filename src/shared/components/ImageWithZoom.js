import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Popover from 'react-native-popover-view';
import {Icon} from 'native-base';

export function ImageWithZoom({
  visible,
  close,
  imageToShow,
  additionalInfo = () => {},
  heightAdjustment = 1,
}) {
  return (
    <Popover isVisible={visible}>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height * heightAdjustment}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height * heightAdjustment}>
          <Image
            style={{resizeMode: 'contain', width: '100%', height: '100%'}}
            source={{uri: imageToShow}}
          />
        </ImageZoom>
        {additionalInfo()}
        <TouchableOpacity
          onPress={close}
          style={{position: 'absolute', right: 24}}>
          <Icon
            type="Entypo"
            name="circle-with-cross"
            style={{color: 'black', fontSize: 38}}
          />
        </TouchableOpacity>
      </View>
    </Popover>
  );
}
