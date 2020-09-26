//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';
import {
  add,
  map,
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

  async uploadPhoto(
    {collectionName, itemId, beforeId},
    newImageId,
    percentages,
    uri,
  ) {
    console.log(itemId);
    const docRef = await this.getDocRefFromInnerId(collectionName)(itemId);
    const objToSave = {id: newImageId, uri, percentages};
    if (!beforeId) {
      return docRef.update({
        images: firestore.FieldValue.arrayUnion({
          before: objToSave,
        }),
      });
    } else {
      firestore().runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          const addAfterImage = compose(
            map(image => {
              return image.before.id == beforeId
                ? {...image, after: objToSave}
                : image;
            }),
            prop('images'),
            safeExec('data'),
          );
          return transaction.update(docRef, 'images', addAfterImage(doc));
        });
      });
    }
  }

  addToArray = (collectionName, id, attr) => async objToAdd => {
    const docRef = await this.getDocRefFromInnerId(collectionName)(id);
    return docRef.update({
      [attr]: firestore.FieldValue.arrayUnion(objToAdd),
    });
  };

  removeFromArray = (collectionName, id, attr) => async idToRemove => {
    const docRef = await this.getDocRefFromInnerId(collectionName)(id);
    return runTransaction(transaction => {
      return transaction.get(docRef).then(doc => {
        const removeLote = compose(
          filter(obj => obj.id !== idToRemove),
          prop(attr),
          safeExec('data'),
        );
        return transaction.update(docRef, 'lotes', removeLote(doc));
      });
    });
  };

  saveImage = (collectionName, attr, which) => url => {};

  getDocRefFromId = collectionName => id => {
    return compose(
      get,
      doc(id),
      collection,
    )(collectionName);
  };

  getDocRefFromInnerId = collectionName => async innerId => {
    const {
      docs: [{id}],
    } = await firestore()
      .collection(collectionName)
      .where('id', '==', innerId)
      .get();
    return firestore()
      .collection(collectionName)
      .doc(id);
  };

  addToCollection = collectionName => objToAdd => {
    return compose(
      add(objToAdd),
      collection,
    )(collectionName);
  };

  getDataFromInnerId = collectionName => async id => {
    const getterById = compose(
      get,
      where('id', '==', id),
      collection,
    );
    return getterById(collectionName).then(
      compose(
        safeExec('data'),
        getIndex(0),
        prop('docs'),
      ),
    );
  };

  getAll(collectionName) {
    const collection = firestore().collection(collectionName);
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

  async addToBothCollections(sessionData) {
    const objToAdd = {
      active: sessionData.active,
      date: sessionData.date,
      description: sessionData.description,
      user: sessionData.user,
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
      this.addToBothCollections.bind(this, sessionData),
    );
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

  async getPasturasFromLote(loteId) {
    const getter = compose(
      get,
      where('loteId', '==', loteId),
      collection,
    );
    return this.callAsyncFunctionWithSpinner(getter).then(
      compose(
        map(
          compose(
            prop('pasturas'),
            safeExec('data'),
          ),
        ),
        prop('docs'),
      ),
    );
  }
}

export const FirebaseService = new Singleton(InnerFirebaseService);
