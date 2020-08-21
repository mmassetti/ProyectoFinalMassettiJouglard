//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';
import moment from 'moment';
import 'moment/locale/es';
import {
  AddLote,
  withAlertService,
  withFirebase,
  LoteSquare,
} from '../../../shared';
import {FlatGrid} from 'react-native-super-grid';

function SessionDetails(props) {
  const {item, itemId, onGoBack} = props.navigation.state.params;
  const [lotes, setLotes] = useState(item.lotes || []);
  useEffect(() => {}, []);

  function goBackToSessions() {
    //TODO: si la accion fue Volver no deberia mandar el onGoBack para evitar que entre al use effect innecesariamente en sessions list
    const {navigation} = props;
    navigation.goBack();
    navigation.state.params.onGoBack();
  }

  const onDelete = () => {
    props.alertService.showConfirmDialog();
  };
  const onPress = () => {
    props.alertService
      .showPromptDialog(
        `Lote ${lotes.length + 1}`,
        'Nombre/Identificador del lote',
      )
      .then(loteName => {
        setLotes(prevLotes => [{description: loteName}].concat(prevLotes));
      });
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.inputContainer}>
        <>
          <Text>Fecha: {moment(item.date.toDate()).format('LL')}</Text>
          <Text>Creador/a: {item.user}</Text>
          <Text>Description: {item.description}</Text>
        </>
      </View>
      <View style={styles.lotesContainer}>
        <Text style={styles.lotesTitle}>Lotes</Text>
        <FlatGrid
          contentContainerStyle={styles.grid}
          itemDimension={140}
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

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
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
