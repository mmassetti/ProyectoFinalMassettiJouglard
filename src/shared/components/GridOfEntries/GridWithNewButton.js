//@ts-check
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AddEntry} from './AddEntry';
import {EntrySquare} from './EntrySquare';
import {FlatGrid} from 'react-native-super-grid';
import {withAlertService, withFirebase} from '../HOCForInjection/WithService';
import {useNavigation} from '@react-navigation/native';

export function InnerGrid({
  title,
  newItemText,
  data,
  alertService,
  firebaseService,
  refresh,
  docRef,
  nextScreen,
  arrayName,
  detailsCollection,
  defaultObj,
}) {
  const navigation = useNavigation();

  const onDelete = id => {
    alertService
      .showConfirmDialog('¡Atención! Se eliminará este lote. ')
      .then(() => {
        firebaseService
          .remove(docRef, arrayName, detailsCollection, id)
          .then(refresh);
      });
  };
  const route = item => {
    navigation.navigate(nextScreen, {
      item: item,
    });
  };
  const onNewPress = () => {
    console.log(defaultObj);
    alertService
      .showPromptDialog(`Lote ${data.length + 1}`, 'Nombre/Identificador')
      .then(name => {
        firebaseService
          .add(
            docRef,
            arrayName,
            detailsCollection,
            {description: name},
            {
              images: [],
              averagePercentages: {},
              ...defaultObj,
            },
          )
          .then(refresh);
      });
  };
  return (
    <View style={styles.lotesContainer}>
      <Text style={styles.lotesTitle}>{title}</Text>
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
