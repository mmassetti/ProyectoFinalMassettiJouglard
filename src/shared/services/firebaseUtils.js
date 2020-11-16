//@ts-check
import firestore from '@react-native-firebase/firestore';
import {SpinnerService} from './spinnerService';
import {uuidv4} from './uuidService';

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
      return this.addObjToArray(docRef, 'images', {before: imageToAdd});
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

  setDummyReference(ref, objToAdd) {
    const originalGet = ref.get.bind(ref);
    const originalUpdate = ref.update.bind(ref);
    const originalDelete = ref.delete.bind(ref);
    const id = uuidv4();
    // firestore()
    //   .collection('toErase')
    //   .doc(ref.id)
    //   .set(objToAdd);
    let oldDummy = firestore()
      .collection('toErase')
      .doc(ref.id);
    // ref.get = () => {
    //   console.log('GET');
    //   return originalGet().catch(() => {
    //     console.log('CATCH');
    //     return oldDummy.get();
    //   });
    // };
    // ref.update = obj => {
    //   console.log('UPDATE');
    //   oldDummy.update(obj);
    //   return originalUpdate(obj);
    // };
    // ref.delete = () => {
    //   console.log('DELETE');
    //   oldDummy.delete();
    //   return originalDelete();
    // };

    return oldDummy
      .get()
      .then(doc => {
        if (!doc.exists) {
          firestore()
            .collection('toErase')
            .doc(ref.id)
            .set(objToAdd);
          oldDummy = firestore()
            .collection('toErase')
            .doc(ref.id);
        }
      })
      .catch(() => {
        firestore()
          .collection('toErase')
          .doc(ref.id)
          .set(objToAdd);
        oldDummy = firestore()
          .collection('toErase')
          .doc(ref.id);
      })
      .finally(() => {
        ref.get = () => {
          return originalGet().catch(() => {
            return oldDummy.get({source: 'cache'});
          });
        };
        ref.update = obj => {
          oldDummy.update(obj);
          return originalUpdate(obj);
        };
        ref.delete = () => {
          oldDummy.delete();
          return originalDelete();
        };
      });
  }
}
