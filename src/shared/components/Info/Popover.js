import {Button} from 'native-base';
import {default as React, default as React} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Popover from 'react-native-popover-view';
import {mainThemeColor, percentages} from '../../configuration';
import {Percentage} from './PercentageCircle';

export function PopoverInfo({isVisible, item}) {
  return (
    <Popover isVisible={isVisible}>
      <View
        style={{
          width: Dimensions.get('window').width * 0.9,
          height: Dimensions.get('window').height * 0.7,
          alignItems: 'center',
        }}>
        <View style={{height: '30%', alignItems: 'center'}}>
          <Text style={styles.title}>Informacion</Text>
          <Text>Descripcion: {item?.description}</Text>
          <Text>Fecha de creacion: {item?.creationDate}</Text>
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
          {percentages.map((percentage, index) => {
            return (
              <Percentage
                key={index}
                color={percentage.color}
                size={Dimensions.get('window').width * 0.2}
                percentage={Math.floor(
                  item?.averagePercentages['total' + percentage.type] /
                    item?.totalImages,
                )}
                title={percentage.title}
              />
            );
          })}
        </View>
        <Button
          onPress={toggleInfo(false)}
          primary
          style={{position: 'absolute', right: 20, bottom: 20, padding: 15}}>
          <Text style={{color: 'white'}}>Cerrar</Text>
        </Button>
      </View>
    </Popover>
  );
}
