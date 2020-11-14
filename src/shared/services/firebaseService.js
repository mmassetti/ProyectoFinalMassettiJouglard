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
    console.log(docRef);
    const id = uniqueId();
    const creationDate = firestore.Timestamp.fromDate(new Date());
    this.addObjToCollection(detailsCollection, {
      id,
      ...objToAdd,
      creationDate,
      ...detailsObj,
    });

    return new Promise(resolve => {
      setTimeout(() => {
        return this.getDocRefInnerId(detailsCollection, id).then(
          ({docRef: ref}) => {
            this.addObjToArray(docRef, attribute, {
              id,
              ref,
              ...objToAdd,
              creationDate,
            });
            resolve();
          },
        );
      }, 0);
    });
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
    this.deleteLotesOfSession(session.data.lotes);
    this.deleteInBatch(session.data.lotes);
    const lotesIds = session.data.lotes.map(lote => lote.ref.id);
    removeSetOfLotes(lotesIds);
    this.getDocRefFromId('sessions', session.id).delete();
    return session.docRef.delete();
  }

  async deleteLotesOfSession(lotes) {
    const dataMap = lotes.map(lote => lote.ref.get());
    return Promise.all(dataMap).then(allData => {
      const allPasturas = allData.reduce((arr, item) => {
        return arr.concat(item.data().pasturas);
      }, []);
      this.deleteInBatch(allPasturas);
    });
  }
}

export const FirebaseService = new Singleton(InnerFirebaseService);
