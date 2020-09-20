//@ts-check
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AddEntry} from '../components/AddEntry';
import {EntrySquare} from '../components/EntrySquare';
import {FlatGrid} from 'react-native-super-grid';

export function GridWithNewButton({
  title,
  data,
  onEntryClick,
  onDeleteEntry,
  onNewClick,
}) {
  return (
    <View style={styles.lotesContainer}>
      <Text style={styles.lotesTitle}>{title}</Text>
      <FlatGrid
        style={styles.grid}
        itemDimension={130}
        data={[{add: true}].concat(data)}
        renderItem={({item}) =>
          item.add ? (
            <AddEntry onPress={onNewClick} />
          ) : (
            <EntrySquare
              item={item}
              onPress={onEntryClick}
              onDelete={onDeleteEntry}
            />
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
