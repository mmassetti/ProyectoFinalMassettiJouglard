import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

export function Percentage(props) {
  const formatText = progress => () => {
    if (props.hidePercentage) return '-';
    if (progress < 3) {
      return '< 3%';
    }
    return `${progress}%`;
  };

  return (
    <View style={styles.circle}>
      <Text style={styles.title}>{props.title}</Text>
      <ProgressCircle
        thickness={7}
        color={props.color}
        progress={props.percentage / 100}
        size={props.size || Dimensions.get('window').width * 0.2}
        showsText={true}
        formatText={formatText(props.percentage)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});
