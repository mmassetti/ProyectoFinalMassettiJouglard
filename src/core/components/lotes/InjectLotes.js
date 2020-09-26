import React, {useState, useEffect} from 'react';
import FirebaseCollection from '../../../shared';

export function sessionInjector(WrappedComponent) {
  return function WithInjector({firebaseService: firebase, navigation}) {
    const [lotes, setLotes] = useState([]);
    const {item, itemId} = navigation.state;
    const collectionDetails = {
      collection: 'sessionsDetails',
      id: itemId,
      attr: 'lotes',
    };
    useEffect(async () => {
      const data = await firebase
        .getDocRefFromInnerId('sessionsDetails', itemId)
        .get();
      setLotes(data.data().lotes);
    });

    return <WrappedComponent items={lotes}>Prueba</WrappedComponent>;
  };
}
