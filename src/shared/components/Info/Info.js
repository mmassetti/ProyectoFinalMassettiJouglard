import moment from 'moment';
import 'moment/locale/es';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainThemeColor} from '../../../configuration';
import {Background} from '../BackgroundFull';
import {PopoverInfo} from './Popover';

export function Info({item, isPastura}) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = showInfo => () => {
    setShowInfo(showInfo);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '17%',
        paddingHorizontal: 10,
        alignItems: 'stretch',
      }}>
      <Background />
      <View
        style={{
          justifyContent: 'space-evenly',
          flex: 7,
          paddingLeft: 10,
        }}>
        <Text numberOfLines={3} style={{fontWeight: 'bold', fontSize: 20}}>
          {item?.description}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'grey'}}>
          {isPastura ? 'Creada' : 'Creado'} el{' '}
          {moment(item?.creationDate.toDate())?.format('L')}
        </Text>
      </View>
      <TouchableOpacity onPress={toggleInfo(true)} style={styles.button}>
        {/* <Icon type="FontAwesome5" name="percentage" style={styles.icon} /> */}
        <Text>Ver promedios</Text>
      </TouchableOpacity>
      <PopoverInfo isVisible={showInfo} item={item} hide={toggleInfo(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    borderColor: mainThemeColor(1),
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flex: 3,
  },
  icon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontWeight: 'bold',
    color: 'grey',
  },
});
