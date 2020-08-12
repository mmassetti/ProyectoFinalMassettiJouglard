import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {lightGray, warnThemeColor} from '../../../configuration/colors';

export default function SessionItem({item, index}) {
  const sessionData = item.data();
  return (
    <View style={[styles.container, index % 2 ? styles.odd : styles.even]}>
      <Image
        source={require('../../../../captures/Default.jpg')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Descripcion: {sessionData.description}
        </Text>
        <Text>Usuario: {sessionData.user}</Text>
        <Text>
          Fecha:
          {sessionData.date.toDate().toISOString()}
        </Text>
        <Text
          style={[
            styles.status,
            sessionData.active ? styles.activeSession : styles.closedSession,
          ]}>
          {sessionData.active ? 'Activa' : 'Cerrada'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    padding: 2,
    borderRadius: 3,
    fontWeight: 'bold',
    bottom: 5,
    right: 0,
    alignSelf: 'flex-end',
  },
  activeSession: {
    backgroundColor: 'green',
    color: 'white',
  },
  closedSession: {
    backgroundColor: warnThemeColor,
    color: 'white',
  },
  container: {
    padding: '2%',
    flexDirection: 'row',
  },
  even: {},
  image: {
    // borderColor: 'black',
    // borderWidth: 5,
    flex: 1,
    maxWidth: '15%',
    maxHeight: Dimensions.get('window').height * 0.1,
    resizeMode: 'contain',
    marginRight: 15,
  },
  odd: {
    backgroundColor: lightGray,
  },
  textContainer: {
    flex: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
