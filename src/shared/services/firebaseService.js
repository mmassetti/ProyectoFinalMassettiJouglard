//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';
import {
  add,
  compose,
  prop,
  filter,
  getIndex,
  safeExec,
  collection,
  where,
  get,
  doc,
  runTransaction,
} from '../../utils';
import {Singleton} from './singletonService';

class InnerFirebaseService {
  spinnerService = SpinnerService.getInstance();

  callAsyncFunctionWithSpinner = this.spinnerService
    .callAsyncFunctionWithSpinner;

  uploadPhoto(photoUri) {
    return collection('imagenes').add({
      imageUri: photoUri,
    });
  }

  getAllSessions() {
    const collection = firestore().collection('sessions');
    return this.callAsyncFunctionWithSpinner(
      collection.get.bind(collection),
    ).then(prop('docs'));
  }

  getSessionById(sessionId) {
    const collectionWithWhere = compose(
      where('sessionId', '==', sessionId),
      collection,
    )('sessionsDetails');

    const getter = collectionWithWhere.get.bind(collectionWithWhere);

    return this.callAsyncFunctionWithSpinner(getter).then(
      compose(
        safeExec('data'),
        getIndex(0),
        prop('docs'),
      ),
    );
  }

  async addSessionToBothCollections(sessionData) {
    const objToAdd = {
      active: sessionData.active,
      date: sessionData.date,
      description: sessionData.description,
      user: sessionData.user,
      visibility: sessionData.visibility,
    };

    const collectionSimple = compose(
      add(objToAdd),
      collection,
    )('sessions');
    return collectionSimple.then(docRef => {
      const collectionAdder = compose(
        add({...objToAdd, sessionId: docRef.id}),
        collection,
      );
      return collectionAdder('sessionsDetails');
    });
  }

  createSession(sessionData) {
    return this.callAsyncFunctionWithSpinner(
      this.addSessionToBothCollections.bind(this, sessionData),
    );
  }

  async removeSession(sessionId) {
    const docRef = await this.getSessionDetailDocRef(sessionId);

    //Remove lotes
    firestore()
      .collection('sessionsDetails')
      .doc(docRef.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let lotesObj = doc.data().lotes;
          if (lotesObj) {
            let lotes = Object.values(lotesObj);
            lotes.map(lote => {
              firestore()
                .collection('lotesDetails')
                .where('loteId', '==', lote.id)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    doc.ref.delete();
                  });
                })
                .catch(error => {
                  console.error('Error al Eliminar Lote: ', error);
                });
            });
          }
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    //Remove SessionDetail
    firestore()
      .collection('sessionsDetails')
      .doc(docRef.id)
      .delete()
      .catch(error => {
        console.log('Error al eliminar el SessionDetail ' + error);
      });

    //Remove session
    firestore()
      .collection('sessions')
      .doc(sessionId)
      .delete()
      .then(() => {
        console.log('Session Eliminado correctamente');
      })
      .catch(error => {
        console.log('Error al eliminar la Session ' + error);
      });
  }

  updateFileWithTransaction(collectionName, docId, transformFn) {
    const docRef = compose(
      doc(docId),
      collection,
    )(collectionName);
    return runTransaction(async transaction => {
      return transaction.get(docRef).then(doc => transformFn(doc, transaction));
    });
  }

  async getSessionDetailDocRef(sessionId) {
    const getterById = compose(
      get,
      where('sessionId', '==', sessionId),
      collection,
    );
    const {
      docs: [doc],
    } = await getterById('sessionsDetails');
    return collection('sessionsDetails').doc(doc.id);
  }

  async addNewLoteToSession(sessionId, newLote) {
    const docRef = await this.getSessionDetailDocRef(sessionId);
    return docRef.update({
      lotes: firestore.FieldValue.arrayUnion(newLote),
    });
  }

  async removeLoteFromSession(sessionId, loteId) {
    const docRef = await this.getSessionDetailDocRef(sessionId);
    return runTransaction(transaction => {
      return transaction.get(docRef).then(doc => {
        const removeLote = compose(
          filter(lote => lote.id !== loteId),
          prop('lotes'),
          safeExec('data'),
        );
        return transaction.update(docRef, 'lotes', removeLote(doc));
      });
    });
  }
}

export const FirebaseService = new Singleton(InnerFirebaseService);
