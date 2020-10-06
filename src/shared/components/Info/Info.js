import {Icon} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainThemeColor} from '../../configuration';
import {Background} from './BackgroundFull';
import {PopoverInfo} from './Popover';

export function Info({item}) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = showInfo => () => {
    setShowInfo(showInfo);
  };
  console.log(item);
  return (
    <View style={{height: '10%'}}>
      <Background />
      <View>
        <Text>Descripcion: {item?.description}</Text>
        <Text style={styles.date}>Fecha de creacion: {item?.creationDate}</Text>
        <TouchableOpacity onPress={toggleInfo(true)} style={styles.button}>
          <Icon type="FontAwesome5" name="percentage" style={styles.text} />
        </TouchableOpacity>
      </View>
      <PopoverInfo isVisible={showInfo} item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: mainThemeColor(1),
    color: 'white',
    borderRadius: 3,
    width: '50%',
    alignSelf: 'center',
    padding: 20,
    justifyContent: 'space-around',
  },
  percentagesTitle: {
    fontSize: 21,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontWeight: 'bold',
    color: 'grey',
  },
});
