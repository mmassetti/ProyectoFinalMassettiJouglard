//@ts-check
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AddEntry} from './AddEntry';
import {EntrySquare} from './EntrySquare';
import {FlatGrid} from 'react-native-super-grid';
import {withAlertService, withFirebase} from '../HOCForInjection/WithService';
import {useNavigation} from '@react-navigation/native';
import {useRecentLotes} from '../../services/recentLotesService';

export function InnerGrid({
  title,
  newItemText,
  data,
  alertService,
  firebaseService,
  refresh,
  docRef,
  nextScreen,
  customDelete,
  arrayName,
  detailsCollection,
  defaultObj,
  esPastura,
}) {
  const navigation = useNavigation();

  const onDelete = item => {
    let msgAlert =
      '¡Atención! Se eliminará este lote y toda la información asociada a él. ';
    if (esPastura) {
      msgAlert =
        '¡Atención! Se eliminará esta pastura y toda la información asociada a ella. ';
    }

    alertService.showConfirmDialog(msgAlert).then(() => {
      customDelete(item);
      // firebaseService.deleteInBatch(item);
      // @ts-ignore
      // removeLoteFromStorage(item.id);
      // firebaseService.removeItemFromArray(docRef, 'lotes', item.id);
      // item.ref.delete();
      // refresh();
      // firebaseService
      //   .remove(docRef, arrayName, detailsCollection, id)
      //   .then(refresh);
    });
  };
  const route = item => {
    navigation.navigate(nextScreen, {
      item,
    });
  };
  const onNewPress = () => {
    let objectToCreate = 'Lote';
    if (esPastura) {
      objectToCreate = 'Pastura';
    }
    alertService
      .showPromptDialog(
        `${objectToCreate} ${data.length + 1}`,
        'Nombre/Identificador',
      )
      .then(name => {
        const initialTotal = {totalGreen: 0, totalYellow: 0, totalNaked: 0};
        firebaseService
          .add(
            docRef,
            arrayName,
            detailsCollection,
            {
              description: name,
              averageAfter: initialTotal,
              averageBefore: initialTotal,
              totalImagesAfter: 0,
              totalImagesBefore: 0,
            },
            {
              images: [],
              ...defaultObj,
            },
          )
          .then(refresh);
      });
  };
  return (
    <View style={styles.lotesContainer}>
      <FlatGrid
        style={styles.grid}
        itemDimension={130}
        data={[{add: true}].concat(data)}
        renderItem={({item}) =>
          item.add ? (
            <AddEntry onPress={onNewPress} text={newItemText} />
          ) : (
            <EntrySquare item={item} onPress={route} onDelete={onDelete} />
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
});

export const GridWithNewButton = withAlertService(withFirebase(InnerGrid));
