import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from '@env';

export class CloudinaryService {
  static _instance;

  static getInstance() {
    if (!this.instance) this.instance = new CloudinaryService();
    return this.instance;
  }

  uploadPhoto(photo) {
    const data = new FormData();

    data.append('file', photo);
    data.append('upload_preset', 'intaapp');
    data.append('cloud_name', 'proyectointauns');
    fetch('https://api.cloudinary.com/v1_1/proyectointauns/image/upload', {
      method: 'PUT',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then(console.log);
  }
}
