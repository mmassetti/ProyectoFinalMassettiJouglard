import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME} from '@env';
import {sha1} from 'react-native-sha256';
import ImgToBase64 from 'react-native-image-base64';

export class CloudinaryService {
  static _instance;

  static getInstance() {
    if (!this.instance) this.instance = new CloudinaryService();
    return this.instance;
  }

  async uploadPhoto(photo) {
    const data = new FormData();
    const timestamp = Date.now();

    // const img = await ImgToBase64.getBase64String(
    //   'file:///storage/emulated/0/Pictures/IntaApp/1594590442784.jpeg',
    // );

    data.append('file', `data:image/png;base64,${img}`);
    data.append('cloud_name', CLOUDINARY_NAME);
    data.append('timestamp', timestamp);
    data.append('api_key', CLOUDINARY_API_KEY);
    data.append(
      'signature',
      await this.getSignature(timestamp, CLOUDINARY_API_SECRET),
    );

    return fetch(
      'https://api.cloudinary.com/v1_1/proyectointauns/image/upload',
      {
        method: 'POST',
        body: data,
      },
    )
      .then()
      .then(response => response.json())
      .then(({secure_url}) => secure_url);
  }

  getSignature(timestamp, secret) {
    const plainText = `timestamp=${timestamp}${secret}`;
    return sha1(plainText);
  }

  getImageByID(id) {
    fetch('https://api.cloudinary.com/v1_1/proyectointauns/resources/images', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then(console.log);
  }
}
