import ImagePicker from 'react-native-image-picker';
import {Singleton} from './singletonService';

class InnerImagePickerService {
  options = {
    mediaType: 'photo',
    cameraType: 'back',
    rotation: 360,
    quality: 1,
    maxWidth: 1080,
    maxHeigth: 1080,
  };

  resolveResponse = (resolve, reject) => response => {
    if (response.didCancel) {
      reject('User cancelled image picker');
    } else if (response.error) {
      reject('ImagePicker Error: ' + response.error);
    } else {
      resolve({
        uri: response.uri,
        data: response.data,
        width: response.width,
        height: response.height,
      });
    }
  };

  getImageFromCamera() {
    const result = new Promise((resolve, reject) => {
      ImagePicker.launchCamera(
        this.options,
        this.resolveResponse(resolve, reject),
      );
    });
    return result;
  }

  getImageFromGallery() {
    const result = new Promise((resolve, reject) => {
      ImagePicker.launchImageLibrary(
        this.options,
        this.resolveResponse(resolve, reject),
      );
    });
    return result;
  }
}
export const ImagePickerService = new Singleton(InnerImagePickerService);
