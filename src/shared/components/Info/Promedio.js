import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Percentage} from '../PercentageCircle';
import {percentages} from '../../../configuration';

export function Promedio({averages, title, totalImages}) {
  return (
    <View>
      <Text>{title}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
