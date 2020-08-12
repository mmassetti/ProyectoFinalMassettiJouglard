import firestore from '@react-native-firebase/firestore';

export class FirebaseService {
  static _instance;

  static getInstance() {
    if (!this._instance) this._instance = new FirebaseService();
    return this._instance;
  }

  uploadPhoto(photoUri) {
    return firestore()
      .collection('imagenes')
      .add({
        imageUri: photoUri,
      });
  }

  getAllSessions() {
    return firestore()
      .collection('sessions')
      .get()
      .then(response => response.docs);
  }
}
