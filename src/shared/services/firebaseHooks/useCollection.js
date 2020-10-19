import firestore from '@react-native-firebase/firestore';

export function useCollection(collectionName) {
  const get = firestore().collection(collectionName).get;

  const add = firestore().collection(collectionName).add;
}
