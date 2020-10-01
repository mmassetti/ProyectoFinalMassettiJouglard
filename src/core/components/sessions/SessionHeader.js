import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import {ReadMoreText} from '../../../shared/components/ReadMoreText';

export function SessionHeader({item: {date, user, description, visibility}}) {
  return (
    <View style={styles.inputContainer}>
      <>
        <Text>
          <Text style={styles.boldText}>Fecha:</Text>{' '}
          {date instanceof Date
            ? moment(date).format('L')
            : moment(date.toDate()).format('L')}
        </Text>
        <Text>
          <Text style={styles.boldText}>Creada por:</Text> {user}
        </Text>
        <Text>
          <Text style={styles.boldText}>Visibilidad: </Text> {visibility}
        </Text>
        <Text>
          <Text style={styles.boldText}>Descripción: </Text>
        </Text>
        <ReadMoreText text={description} style={styles.titleText} />
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
