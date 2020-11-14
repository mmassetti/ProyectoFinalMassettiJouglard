import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import {ReadMoreText} from '../../../shared/components/ReadMoreText';

export function SessionHeader({item: {date, user, description, visibility}}) {
  return (
    <View style={styles.inputContainer}>
      <>
        <Text style={styles.text}>
          <Text style={[styles.boldText, styles.text]}>Fecha:</Text>{' '}
          {date instanceof Date
            ? moment(date).format('L')
            : moment(date.toDate()).format('L')}
        </Text>
        <Text style={styles.text}>
          <Text style={[styles.boldText, styles.text]}>Creada por:</Text> {user}
        </Text>
        <ReadMoreText text={description}>
          <Text style={[styles.boldText, styles.text]}>Descripción: </Text>
          <Text style={styles.text}>{description}</Text>
        </ReadMoreText>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    margin: 20,
    width: '90%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
});
