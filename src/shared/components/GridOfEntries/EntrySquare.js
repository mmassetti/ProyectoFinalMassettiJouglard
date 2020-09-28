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
        onPress={onDelete.bind(null, item.id)}>
        <Icon style={styles.crossIcon} name="squared-cross" type="Entypo" />
      </TouchableOpacity>
      <Text style={styles.text}>{item.description}</Text>
      <View style={styles.percentagesContainer}>
        {percentages.map((percentage, index) => {
          return (
            <Text key={index} style={{color: percentage.color, ...styles.text}}>
              {item['percentage' + percentage.type] || '-'}
            </Text>
          );
        })}
      </View>
      <Text>% promedio</Text>
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
    right: 0,
    top: 0,
    paddingBottom: 15,
    paddingLeft: 15,
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
