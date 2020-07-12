import firestore from '@react-native-firebase/firestore';

export class FirebaseService {
  static _instance;

  static getInstance() {
    if (!this.instance) this.instance = new FirebaseService();
    return this.instance;
  }

  uploadPhoto(photoUri) {
    return firestore()
      .collection('imagenes')
      .add({
        imageUri: photoUri,
      });
  }
}
