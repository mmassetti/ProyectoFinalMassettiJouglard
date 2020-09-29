//@ts-check
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  uniqueId,
  GridWithNewButton,
  DocRefContextProvider,
} from '../../../shared';
import {SessionHeader} from './SessionHeader';

function SessionDetails({navigation, firebaseService, alertService}) {
  const {item, itemId} = navigation.state.params;
  const [lotes, setLotes] = useState([]);
  const [docRef, setDocRef] = useState();

  useEffect(() => {
    async function retrieveDetails() {
      const {docRef} = await firebaseService.getDocRefInnerId(
        'sessionsDetails',
        itemId,
      );
      docRef.get().then(session => {
        setLotes(session?.data().lotes.reverse() || []);
      });
      setDocRef(docRef);
    }
    retrieveDetails();
  }, [itemId]);

  const onDelete = loteId => {
    alertService
      .showConfirmDialog('¡Atención! Se eliminará este lote. ')
      .then(() => {
        setLotes(lotes.filter(lote => lote.id !== loteId));
        firebaseService.removeItemFromArray(docRef, 'lotes', loteId);
      });
  };
  const onNewPress = () => {
    alertService
      .showPromptDialog(
        `Lote ${lotes.length + 1}`,
        'Nombre/Identificador del lote',
      )
      .then(loteName => {
        const newLote = {id: uniqueId(), description: loteName};
        setLotes(prevLotes => [newLote].concat(prevLotes));
        firebaseService.addObjToArray(docRef, 'lotes', newLote);
        firebaseService.addObjToCollection('lotesDetail', {
          ...newLote,
          images: [],
          pasturas: [],
          averagePercentages: {},
        });
      });
  };

  const routeToLote = item => {
    navigation.navigate('LoteDetails', {
      item: item,
    });
  };

  return (
    <DocRefContextProvider docRef={docRef}>
      <View style={styles.viewContainer}>
        <SessionHeader item={item} />
        <GridWithNewButton
          title="Lotes"
          data={lotes}
          onDeleteEntry={onDelete}
          onNewClick={onNewPress}
          onEntryClick={routeToLote}
        />
      </View>
    </DocRefContextProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
  },
  lotesContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  lotesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  inputContainer: {
    marginTop: 20,
  },
});

export default withAlertService(withFirebase(SessionDetails));
