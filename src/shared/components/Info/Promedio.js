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
              size={Dimensions.get('window').width * 0.18}
              hidePercentage={!totalImages}
              percentage={Math.floor(
                averages?.['total' + percentage.type] / (totalImages || 1),
              )}
              title={percentage.title}
            />
          );
        })}
      </View>
      <Text
        style={{
          color: 'black',
          alignSelf: 'flex-end',
          fontWeight: 'bold',
          fontSize: 15,
          marginRight: '5%',
        }}>
        Cantidad de imágenes: {totalImages}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  percentagesContainer: {
    backgroundColor: mainThemeColor(1),
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    width: '90%',
  },
  title: {
    fontSize: 22,
    color: 'black',
  },
});
