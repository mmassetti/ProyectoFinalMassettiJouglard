import {Button} from 'native-base';
import React from 'react';
import {Dimensions, Text, StyleSheet, View} from 'react-native';
import Popover from 'react-native-popover-view';
import {mainThemeColor} from '../../../configuration';
import {Percentage} from '../PercentageCircle';
import {Promedio} from './Promedio';

export function PopoverInfo({isVisible, item, hide}) {
  return (
    <Popover isVisible={isVisible}>
      <View
        style={{
          width: Dimensions.get('window').width * 0.9,
          height: Dimensions.get('window').height * 0.7,
          alignItems: 'center',
        }}>
        <View style={{height: '30%', alignItems: 'center'}}>
          <Text>Cantidad total de imagenes: {item?.totalImages}</Text>
        </View>
        <Text style={styles.percentagesTitle}>Promedio de Cubrimiento</Text>
        <View
          style={{
            backgroundColor: mainThemeColor(1),
            paddingBottom: 30,
            borderRadius: 6,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Promedio
            title="Antes"
            averages={item?.averageBefore}
            totalImages={item?.totalImages}
          />
          <Promedio
            title="Despues"
            averages={item?.averageAfter}
            totalImages={item?.totalImages}
          />
        </View>
        <Button
          onPress={hide}
          primary
          style={{position: 'absolute', right: 20, bottom: 20, padding: 15}}>
          <Text style={{color: 'white'}}>Cerrar</Text>
        </Button>
      </View>
    </Popover>
  );
}
const styles = StyleSheet.create({
  percentagesTitle: {
    fontSize: 21,
  },
});
