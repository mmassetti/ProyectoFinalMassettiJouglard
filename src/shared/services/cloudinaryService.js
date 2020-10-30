import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME} from '@env';
import {sha1} from 'react-native-sha256';
import ImgToBase64 from 'react-native-image-base64';
import {SpinnerService} from './spinnerService';
import {Singleton} from './singletonService';

class InnerCloudinaryService {
  spinnerService = SpinnerService.getInstance();

  async uploadPhoto(photo) {
    const data = new FormData();
    const timestamp = Date.now();

    const img = await ImgToBase64.getBase64String(photo);

    data.append('file', `data:image/png;base64,${img}`);
    data.append('cloud_name', CLOUDINARY_NAME);
    data.append('timestamp', timestamp);
    data.append('api_key', CLOUDINARY_API_KEY);
    data.append(
      'signature',
      await this.getSignature(timestamp, CLOUDINARY_API_SECRET),
    );
    return this.spinnerService
      .callAsyncFunctionWithSpinner(
        fetch.bind(
          null,
          'https://api.cloudinary.com/v1_1/proyectointauns/image/upload',
          {
            method: 'POST',
            body: data,
          },
        ),
      )
      .then(response => response.json())
      .then(({secure_url}) => secure_url);
  }

  async getSignature(timestamp, secret) {
    const plainText = `timestamp=${timestamp}${secret}`;
    return sha1(plainText);
  }
}

export const CloudinaryService = new Singleton(InnerCloudinaryService);
