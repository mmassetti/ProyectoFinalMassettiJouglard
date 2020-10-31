//@ts-check
import firestore from '@react-native-firebase/firestore';
import {Singleton} from './singletonService';
import {FirebaseUtils} from './firebaseUtils';
import {uuidv4 as uniqueId} from './uuidService';
import {store} from '../../store';
import {removeLoteFromArray, removeSetOfLotes} from './recentLotesService';

export class InnerFirebaseService extends FirebaseUtils {
  async remove(sessionRef, attribute, detailsCollection, id) {
    const removeFromArray = this.removeItemFromArray(sessionRef, attribute, id);
    const {docRef} = await this.getDocRefInnerId(detailsCollection, id);
    const removeFromCollection = docRef.delete();
    return Promise.all([]);
    // return this.generatePromise(removeFromArray, removeFromCollection);
  }

  async add(docRef, attribute, detailsCollection, objToAdd, detailsObj) {
    const id = uniqueId();
    const creationDate = firestore.Timestamp.fromDate(new Date());
    const addToCollection = await this.addObjToCollection(detailsCollection, {
      id,
      ...objToAdd,
      creationDate,
      ...detailsObj,
    });
    this.addObjToArray(docRef, attribute, {
      id,
      ref: addToCollection,
      ...objToAdd,
      creationDate,
    });
    return Promise.all([]);
    // return this.generatePromise(addToSession, addToCollection)
    //   .then(() => {
    //     console.log('Connection');
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  }
  getDataFromDocRef(docRef) {
    return this.withSpinner(docRef.get.bind(docRef));
  }

  generatePromise = (...promises) =>
    promises.length === 1 ? promises[0] : Promise.all(promises);

  deleteLote(lote) {
    const {session} = store.getState();
    this.deleteInBatch(lote.pasturas);
    removeLoteFromArray(lote.ref.id);
    console.log('lote', lote);
    lote.ref.delete();
    return this.removeItemFromArray(
      session.docRef,
      session.data.lotes,
      'lotes',
      lote.id,
    );
  }
  deletePastura(pastura) {
    const {lote} = store.getState();
    pastura.ref.delete();
    return this.removeItemFromArray(
      lote.docRef,
      lote.data.pasturas,
      'pasturas',
      pastura.id,
    );
  }

  deleteSession(session) {
    this.deleteInBatch(session.lotes);
    const lotesIds = session.lotes.map(lote => lote.ref.id);
    console.log('lotesIds', lotesIds);
    removeSetOfLotes(lotesIds);
    this.getDocRefFromId('sessions', session.id).delete();
    return session.ref.delete();
  }
}

export const FirebaseService = new Singleton(InnerFirebaseService);
