//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';

export class FirebaseUtils {
  withSpinner = SpinnerService.getInstance().callAsyncFunctionWithSpinner;

  getAll = collectionName => {
    return firestore()
      .collection(collectionName)
      .orderBy('date', 'desc')
      .get();
  };

  paginateQuery = (query, perPage, last, page) => {
    return query
      .startAfter(last)
      .limit(perPage)
      .get();
  };

  getDocRefFromId = (collectionName, id) => {
    return firestore()
      .collection(collectionName)
      .doc(id);
  };
  getDocRefInnerId = async (collectionName, innerId) => {
    return firestore()
      .collection(collectionName)
      .where('id', '==', innerId)
      .get()
      .then(({docs: [doc]}) => {
        return {
          docRef: doc.ref,
          data: doc.data(),
        };
      });
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

  removeItemFromArray = async (docRef, oldArray, attribute, idToRemove) => {
    const newArray = oldArray.filter(item => item.id !== idToRemove);
    return docRef.update({
      [attribute]: newArray,
    });
  };

  removeItemFromArrayByDescription = async (
    docRef,
    attribute,
    descriptionToRemove,
  ) => {
    const response = await docRef.get();
    const oldArray = response.data()[attribute];
    const newArray = oldArray.filter(item => item !== descriptionToRemove);
    return docRef.update({
      [attribute]: newArray,
    });
  };

  uploadPhoto = async ({docRef, beforeId, prevImages = []}, imageToAdd) => {
    let newImages;
    if (!beforeId) {
      newImages = prevImages.concat([{before: imageToAdd}]);
    } else {
      newImages = prevImages.map(image => {
        return image.before.id == beforeId
          ? {...image, after: imageToAdd}
          : image;
      });
    }
    return docRef.update({images: newImages});
  };

  async deleteInBatch(array) {
    const batch = firestore().batch();
    array.forEach(item => {
      batch.delete(item.ref);
    });
    // const allArrays = [];
    // for (let i = 0; i < arrayOfIds.length; i += 10) {
    //   allArrays.push(
    //     firestore()
    //       .collection(detailsCollection)
    //       .where('id', 'in', arrayOfIds.slice(i, i + 10))
    //       .get(),
    //   );
    // }
    // const allDocs = await Promise.all(allArrays);
    // const flattenArray = [].concat(...allDocs.map(response => response.docs));
    //
    // const docsRefs = flattenArray.map(doc =>
    //   firestore()
    //     .collection(detailsCollection)
    //     .doc(doc.id),
    // );
    // for (const ref of docsRefs) {
    //   batch.delete(ref);
    // }
    return batch.commit();
  }

  appendUpdateToBatch(docRef, obj, batch = firestore().batch()) {
    batch.update(docRef, obj);
    return batch;
  }
  updatePhotoPic({id, imageId, collectionName}, url) {
    const docRef = firestore()
      .collection(collectionName)
      .doc(id);

    return firestore().runTransaction(transaction => {
      return transaction.get(docRef).then(doc => {
        const images = doc.data().images;
        const newImages = images.map(img => {
          if (img.before.id == imageId) {
            img.before.uri = url;
          } else if (img.after?.id == imageId) {
            img.after.uri = url;
          }
          return img;
        });
        return transaction.update(docRef, {images: newImages});
      });
    });
  }
}
