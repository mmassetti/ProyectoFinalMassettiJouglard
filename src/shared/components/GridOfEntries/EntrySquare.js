import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
import {percentages, mainThemeColor} from '../../../configuration';
import {successThemeColor, warnThemeColor} from '../../../configuration/colors';

export function EntrySquare({onDelete, item, onPress}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress.bind(null, item)}>
      <TouchableOpacity
        style={styles.cross}
        onPress={onDelete.bind(null, item)}>
        <Icon style={styles.crossIcon} name="trash-alt" type="FontAwesome5" />
      </TouchableOpacity>
      <Text style={styles.text}>{item.description}</Text>
      <View style={styles.percentagesContainer}>
        {percentages.map((percentage, index) => {
          return (
            <Text key={index} style={{color: percentage.color, ...styles.text}}>
              {item.totalImagesBefore > 0
                ? Math.floor(
                    item.averageBefore['total' + percentage.type] /
                      item.totalImagesBefore,
                  )
                : '-'}
            </Text>
          );
        })}
      </View>
      <Text>% promedio Antes</Text>
      <Text>Imagenes Antes: {item.totalImagesBefore}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '20%',
    paddingBottom: '20%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: successThemeColor(0.2),
  },
  cross: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  crossIcon: {
    color: warnThemeColor(0.7),
  },
  percentagesContainer: {
    flexDirection: 'row',
    backgroundColor: mainThemeColor(1),
    width: '80%',
    padding: '5%',
    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
