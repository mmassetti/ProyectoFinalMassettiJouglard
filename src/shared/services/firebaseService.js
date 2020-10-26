//@ts-check
import firestore from '@react-native-firebase/firestore';
import {Singleton} from './singletonService';
import {FirebaseUtils} from './firebaseUtils';
import {uuidv4 as uniqueId} from './uuidService';

export class InnerFirebaseService extends FirebaseUtils {
  async remove(sessionRef, attribute, detailsCollection, id) {
    const removeFromArray = this.removeItemFromArray(sessionRef, attribute, id);
    const {docRef} = await this.getDocRefInnerId(detailsCollection, id);
    const removeFromCollection = docRef.delete();
    return Promise.all([]);
    // return this.generatePromise(removeFromArray, removeFromCollection);
  }

  add(docRef, attribute, detailsCollection, objToAdd, detailsObj) {
    const id = uniqueId();

    const creationDate = firestore.Timestamp.fromDate(new Date());
    const addToSession = this.addObjToArray(docRef, attribute, {
      id,
      ...objToAdd,
      creationDate,
    });
    const addToCollection = this.addObjToCollection(detailsCollection, {
      id,
      ...objToAdd,
      creationDate,
      ...detailsObj,
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
}

export const FirebaseService = new Singleton(InnerFirebaseService);
