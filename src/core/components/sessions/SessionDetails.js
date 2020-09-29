//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  uniqueId,
  GridWithNewButton,
} from '../../../shared';
import {SessionHeader} from './SessionHeader';

function SessionDetails(props) {
  const {item, itemId} = props.route.params;
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    props.firebaseService.getSessionById(itemId).then(session => {
      setLotes(session?.lotes.reverse() || []);
    });
  }, [itemId]);

  const onDelete = loteId => {
    props.alertService
      .showConfirmDialog('¡Atención! Se eliminará este lote. ')
      .then(() => {
        setLotes(lotes.filter(lote => lote.id !== loteId));
        props.firebaseService.removeLoteFromSession(itemId, loteId);
      });
  };
  const onNewPress = () => {
    props.alertService
      .showPromptDialog(
        `Lote ${lotes.length + 1}`,
        'Nombre/Identificador del lote',
      )
      .then(loteName => {
        const newLote = {id: uniqueId(), description: loteName};
        setLotes(prevLotes => [newLote].concat(prevLotes));
        props.firebaseService.addNewLoteToSession(itemId, newLote);
      });
  };

  const routeToLote = item => {
    props.navigation.navigate('LoteDetails', {
      item: item,
    });
  };

  return (
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
