//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';
import {
  compose,
  extractDataFromDoc,
  extractDocs,
  prop,
  filter,
  getIndex,
  safeExec,
} from '../utils';

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
      .then(prop('docs'));
  }

  getSessionById(sessionId) {
    const collectionWithWhere = firestore()
      .collection('sessionsDetails')
      .where('sessionId', '==', sessionId);

    const getter = collectionWithWhere.get.bind(collectionWithWhere);

    return this.spinnerService.callAsyncFunctionWithSpinner(getter).then(
      compose(
        safeExec('data'),
        getIndex(0),
        extractDocs,
      ),
    );
  }

  async addSessionToBothCollections(sessionData) {
    const collection = firestore().collection('sessions');
    const collectionDetails = firestore().collection('sessionsDetails');
    const objToAdd = {
      active: sessionData.active,
      date: sessionData.date,
      description: sessionData.description,
      user: sessionData.user,
    };
    return collection
      .add(objToAdd)
      .then(docRef =>
        collectionDetails.add({...objToAdd, sessionId: docRef.id}),
      );
  }

  createSession(sessionData) {
    return this.spinnerService.callAsyncFunctionWithSpinner(
      this.addSessionToBothCollections.bind(this, sessionData),
    );
  }

  updateFileWithTransaction(collection, docId, transformFn) {
    const docRef = firestore()
      .collection(collection)
      .doc(docId);
    return firestore().runTransaction(async transaction => {
      return transaction.get(docRef).then(doc => transformFn(doc, transaction));
    });
  }

  async addNewLoteToSession(sessionId, newLote) {
    const docRef = await this.getSessionDetailDocRef(sessionId);
    return docRef.update({
      lotes: firestore.FieldValue.arrayUnion(newLote),
    });
  }

  async getSessionDetailDocRef(sessionId) {
    const {
      docs: [doc],
    } = await firestore()
      .collection('sessionsDetails')
      .where('sessionId', '==', sessionId)
      .get();
    const docRef = firestore()
      .collection('sessionsDetails')
      .doc(doc.id);
    return docRef;
  }

  async removeLoteFromSession(sessionId, loteId) {
    const docRef = await this.getSessionDetailDocRef(sessionId);
    return firestore().runTransaction(transaction => {
      return transaction.get(docRef).then(doc => {
        const lotesUpdated = compose(
          filter(lote => lote.id !== loteId),
          prop('lotes'),
          extractDataFromDoc,
        )(doc);
        return transaction.update(docRef, 'lotes', lotesUpdated);
      });
    });
  }
}
