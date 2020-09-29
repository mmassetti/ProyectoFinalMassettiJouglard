//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';
import {Singleton} from './singletonService';

class InnerFirebaseService {
  spinnerService;
  constructor() {
    this.spinnerService = SpinnerService.getInstance();
  }

  getAll = collectionName => {
    return firestore()
      .collection(collectionName)
      .get();
  };

  getDocRefFromId = (collectionName, id) => {
    return firestore()
      .collection(collectionName)
      .doc(id);
  };
  getDocRefInnerId = async (collectionName, innerId) => {
    console.log('innerId', innerId);
    console.log('collectionName', collectionName);
    const {
      docs: [doc],
    } = await firestore()
      .collection(collectionName)
      .where('id', '==', innerId)
      .get();
    console.log('doc', doc.id);
    return {
      docRef: firestore()
        .collection(collectionName)
        .doc(doc.id),
      data: doc.data(),
    };
  };

  addObjToCollection = (collectionName, objToAdd) => {
    return firestore()
      .collection(collectionName)
      .add(objToAdd);
  };

  addObjToArray = (docRef, attribute, objToAdd) => {
    return docRef.update({
      [attribute]: firestore.FieldValue.arrayUnion(objToAdd),
    });
  };

  removeItemFromArray = async (docRef, attribute, idToRemove) => {
    const response = await docRef.get();
    const oldArray = response.data()[attribute];
    const newArray = oldArray.filter(item => item.id !== idToRemove);
    return docRef.update({
      [attribute]: newArray,
    });
  };

  uploadPhoto = async ({docRef, beforeId}, imageToAdd) => {
    if (!beforeId) {
      return docRef.update({
        images: firestore.FieldValue.arrayUnion({
          before: imageToAdd,
        }),
      });
    } else {
      const data = (await docRef.get()).data();
      const newImages = data.images.map(image => {
        return image.before.id == beforeId
          ? {...image, after: imageToAdd}
          : image;
      });

      return docRef.update({images: newImages});
    }
  };
}

export const FirebaseService = new Singleton(InnerFirebaseService);
