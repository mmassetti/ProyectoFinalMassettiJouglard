import {NativeModules} from 'react-native';
import * as colorsRange from '../../configuration/colors';
import {Singleton} from './singletonService';

class InnerImageProcessor {
  async processImage(uriImage) {
    return NativeModules.NativeOpenCV.processImage(
      uriImage,
      colorsRange.greenRange,
      colorsRange.yellowRange,
    );
  }

  async adjustImage(imageBase64, sliderType, changedValue) {
    return NativeModules.NativeOpenCV.adjustImage(
      imageBase64,
      sliderType,
      changedValue,
    );
  }
}
export const ImageProcessor = new Singleton(InnerImageProcessor);
