import firestore from '@react-native-firebase/firestore';

export const collection = collectionName =>
  firestore().collection(collectionName);

export const doc = docId => collection => collection.doc(docId);

export const where = (attr, relation, value) => collection =>
  collection.where(attr, relation, value);

export const runTransaction = fn => firestore().runTransaction(fn);

export const add = objToAdd => collection => collection.add(objToAdd);

export const get = collection => collection.get();
