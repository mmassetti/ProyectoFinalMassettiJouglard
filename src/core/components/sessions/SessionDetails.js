//@ts-check
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  AddLote,
  withAlertService,
  withFirebase,
  LoteSquare,
  uniqueId,
} from '../../../shared';
import {FlatGrid} from 'react-native-super-grid';
import {SessionHeader} from './SessionHeader';
import {compose, prop, reverse} from '../../../utils';

function SessionDetails(props) {
  const {item, itemId} = props.navigation.state.params;
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    props.firebaseService.getSessionById(itemId).then(session => {
      setLotes(session?.lotes.reverse() || []);
    });
    // .then(
    //   compose(
    //     setLotes,
    //     reverse,
    //     prop('lotes'),
    //   ),
    // );
  }, [itemId]);

  const onDelete = loteId => {
    props.alertService
      .showConfirmDialog('Esta seguro/a que quiere borrar este lote?')
      .then(() => {
        setLotes(lotes.filter(lote => lote.id !== loteId));
        props.firebaseService.removeLoteFromSession(itemId, loteId);
      });
  };
  const onPress = () => {
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

  return (
    <View style={styles.viewContainer}>
      <SessionHeader item={item} />
      <View style={styles.lotesContainer}>
        <Text style={styles.lotesTitle}>Lotes</Text>
        <FlatGrid
          style={styles.grid}
          itemDimension={130}
          data={[{addLote: true}].concat(lotes)}
          renderItem={({item}) =>
            item.addLote ? (
              <AddLote onPress={onPress} />
            ) : (
              <LoteSquare item={item} onDelete={onDelete} />
            )
          }
        />
      </View>
    </View>
  );
}

SessionDetails.navigationOptions = {
  headerTitle: 'Your custom label...',
};

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
