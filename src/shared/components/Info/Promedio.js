import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Percentage} from '../PercentageCircle';
import {percentages, mainThemeColor} from '../../../configuration';

export function Promedio({averages, title, totalImages}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.percentagesContainer}>
        {percentages.map((percentage, index) => {
          return (
            <Percentage
              key={index}
              color={percentage.color}
              size={Dimensions.get('window').width * 0.2}
              percentage={Math.floor(
                averages?.['total' + percentage.type] / (totalImages || 1),
              )}
              title={percentage.title}
            />
          );
        })}
        <Text style={{color: 'black'}}>{totalImages}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  percentagesContainer: {
    backgroundColor: mainThemeColor(1),
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 22,
    color: 'black',
  },
});
