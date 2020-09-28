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

export class FirebaseCollection {
  collectionName;
  spinnerService;
  constructor(collectionName, innerCollection) {
    this.collectionName = collectionName;
    this.innerCollection = innerCollection;
    this.spinnerService = SpinnerService.getInstance();
  }

  getAll() {
    return this.spinnerService.callAsyncFunctionWithSpinner(
      compose(
        get,
        collection,
      )(this.collectionName),
    );
  }

  getById(id) {
    return compose(
      get,
      doc(id),
      collection,
    )(this.collectionName).then(compose(safeExec('data')));
  }

  getByInnerId(idAttr, innerId) {
    const collectionWithWhere = compose(
      where(idAttr, '==', innerId),
      collection,
    )(this.collectionName);

    const getter = collectionWithWhere.get.bind(collectionWithWhere);

    return this.callAsyncFunctionWithSpinner(getter).then(
      compose(
        safeExec('data'),
        getIndex(0),
        prop('docs'),
      ),
    );
  }
}
