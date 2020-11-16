import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {percentages, mainThemeColor} from '../../configuration';
import {Percentage} from '../../shared';

export class Percentages extends Component {
  render() {
    return (
      <View style={styles.percentages}>
        <Text style={styles.cover}>{this.props.title || 'Cobertura'}</Text>
        <View style={styles.circlesContainer}>
          {percentages.map((percentage, index) => {
            return (
              <Percentage
                key={index}
                color={percentage.color}
                size={Dimensions.get('window').width * 0.2}
                percentage={
                  this.props.percentages['percentage' + percentage.type]
                }
                title={percentage.title}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  percentages: {
    flex: 4,
    width: '90%',
    borderRadius: 25,
    backgroundColor: mainThemeColor(1),
    alignItems: 'center',
    padding: 25,
    elevation: 3,
    paddingTop: 0,
    marginBottom: 10,
    paddingBottom: 30,
  },
  circlesContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cover: {
    fontSize: 28,
    paddingBottom: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
