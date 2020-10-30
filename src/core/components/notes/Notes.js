import React, {useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {
  withAlertService,
  withFirebase,
} from '../../../shared/components/HOCForInjection/WithService';
import SingleNote from './SingleNote';
import {mainThemeColor} from '../../../configuration/colors';
import {MyInput, Input} from '../../../shared';
import {Button} from 'native-base';

function Notes({notes, firebaseService, alertService, docRef, refresh}) {
  const [newNote, setNewNote] = useState('');
  const renderItem = ({item, index}) => {
    return (
      <SingleNote nota={item} index={index} docRef={docRef} refresh={refresh} />
    );
  };

  const newNoteButton = () => {
    return (
      <View style={[styles.buttonsContainer]}>
        <Input
          value={newNote}
          placeholder="Agregar nota..."
          onChange={setNewNote}
        />
        <Button
          onPress={onNewNotePress}
          style={[styles.button]}
          primary
          disabled={!newNote.length}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Button>
      </View>
    );
  };

  const onNewNotePress = () => {
    alertService
      .showConfirmDialog('Seguro/a que quiere guardar esta nota?')
      .then(() => {
        firebaseService.addObjToArray(docRef, 'notes', newNote).then(refresh);
        setNewNote('');
      });
  };

  return (
    <>
      <View style={styles.containerStyle}>
        {notes && notes.length > 0 ? (
          <>
            {newNoteButton()}
            <FlatList
              data={notes}
              keyExtractor={item => item}
              renderItem={renderItem}
            />
          </>
        ) : (
          <>
            <View style={styles.centeredTextStyle}>
              <Text>Esta sesión todavía no tiene notas</Text>
            </View>
            {newNoteButton()}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 10,
  },
  containerStyle: {},
  button: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {color: 'white'},
  centeredTextStyle: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withAlertService(withFirebase(Notes));
