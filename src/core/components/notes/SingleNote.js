import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ReadMoreText} from '../../../shared/components/ReadMoreText';
import {lightGray, warnThemeColor} from '../../../configuration/colors';
import {Icon} from 'native-base';
import {withAlertService, withFirebase} from '../../../shared/index.js';

function SingleNote({
  nota,
  index,
  docRef,
  firebaseService,
  alertService,
  refresh,
}) {
  console.log(nota);
  function deleteNote() {
    alertService
      .showConfirmDialog('¡Atención! Se eliminará esta nota. ')
      .then(() => {
        firebaseService
          .removeItemFromArrayByDescription(docRef, 'notes', nota)
          .then(refresh);
      });
  }

  return (
    <View style={[styles.container, index % 2 ? styles.odd : styles.even]}>
      <View style={styles.textContainer}>
        <ReadMoreText>
          <Text>{index + 1 + ') ' + nota}</Text>
        </ReadMoreText>
        <TouchableOpacity
          transparent
          style={styles.deleteButton}
          onPress={deleteNote}>
          <Icon type="FontAwesome5" name="trash" style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    flexDirection: 'row',
  },
  even: {},
  odd: {
    backgroundColor: lightGray,
  },
  textContainer: {
    flex: 2,
  },
  deleteButton: {
    position: 'absolute',
    right: 1,
  },
  deleteIcon: {
    color: warnThemeColor(0.7),
    fontSize: 21,
  },
});

export default withAlertService(withFirebase(SingleNote));
