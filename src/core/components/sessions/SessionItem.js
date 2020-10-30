import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {
  lightGray,
  warnThemeColor,
  successThemeColor,
} from '../../../configuration/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/es';

export default function SessionItem(props) {
  const {item, index} = props;
  const sessionData = item.data();
  return (
    <TouchableOpacity onPress={() => props.onItemPressed(item)}>
      <View style={[styles.container, index % 2 ? styles.odd : styles.even]}>
        <View style={styles.textContainer}>
          <Text numberOfLines={3} style={styles.titleText}>
            {sessionData.description}
          </Text>

          <Text>Creada por: {sessionData.user}</Text>
          <Text>Fecha: {moment(sessionData.date.toDate()).format('L')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  status: {
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    fontWeight: 'bold',
    top: '-2.1%',
    right: '-2.1%',
    alignSelf: 'flex-start',
  },
  activeSession: {
    backgroundColor: successThemeColor(1),
    color: 'white',
  },
  closedSession: {
    backgroundColor: warnThemeColor(1),
    color: 'white',
  },
  container: {
    padding: '2%',
    flexDirection: 'row',
  },
  even: {},
  image: {
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
