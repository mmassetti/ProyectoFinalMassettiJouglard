import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';

export function SessionHeader({item: {date, user, description}}) {
  return (
    <View style={styles.inputContainer}>
      <>
        <Text>Fecha: {moment(date.toDate()).format('LL')}</Text>
        <Text>Creador/a: {user}</Text>
        <Text>Description: {description}</Text>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
});
