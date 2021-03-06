import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {options, switchConfig} from '../../../configuration';
import {ImageWithAdjustment} from '../ImageEditor/ImageWithButton';
import {Percentages} from '../../../core/components/Percentages';

export function ImageView({
  originalImage,
  processedImage,
  percentages,
  updateOriginalImage,
  staticOriginal,
  shouldRotate,
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  function getImage() {
    let sourceOfImage = showOriginal ? originalImage : processedImage;
    return sourceOfImage;
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <SwitchSelector
          style={styles.switch}
          options={options}
          onPress={setShowOriginal}
          {...switchConfig}
        />
      </View>
      <ImageWithAdjustment
        onImageAdjusted={updateOriginalImage}
        imageToEdit={staticOriginal}
        shouldRotate={shouldRotate}
        nonProcessedImage={originalImage}
        imageToShow={getImage()}
      />
      <Percentages percentages={percentages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  information: {
    flex: 1,
  },
  switchContainer: {
    paddingTop: 15,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    width: '80%',
    zIndex: 99,
  },
});
