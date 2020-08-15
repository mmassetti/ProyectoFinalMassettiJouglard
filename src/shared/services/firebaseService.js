import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';

export class FirebaseService {
  static _instance;
  spinnerService = SpinnerService.getInstance();

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
    const collection = firestore().collection('sessions');
    return this.spinnerService
      .callAsyncFunctionWithSpinner(collection.get.bind(collection))
      .then(response => {
        return response.docs;
      });
  }

  createSession(sessionData) {
    const collection = firestore().collection('sessions');
    return this.spinnerService.callAsyncFunctionWithSpinner(
      collection.add.bind(collection, {
        active: sessionData.active,
        date: sessionData.date,
        description: sessionData.description,
        user: sessionData.user,
      }),
    );
  }
}
