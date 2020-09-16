import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import {Text} from 'native-base';

export function SessionHeader({item: {date, user, description, visibility}}) {
  return (
    // <Content padder>
    //   <Accordion
    //     dataArray={dataArray}
    //     headerStyle={{backgroundColor: '#b7daf8'}}
    //   />
    // </Content>

    <View style={styles.inputContainer}>
      <>
        <Text>
          <Text style={styles.boldText}>Fecha:</Text>{' '}
          {moment(date.toDate()).format('L')}
        </Text>
        <Text>
          <Text style={styles.boldText}>Creada por:</Text> {user}
        </Text>
        <Text>
          <Text style={styles.boldText}>Visibilidad: </Text> {visibility}
        </Text>
        <Text>
          <Text style={styles.boldText}>Descripción: </Text> {description}
        </Text>
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
