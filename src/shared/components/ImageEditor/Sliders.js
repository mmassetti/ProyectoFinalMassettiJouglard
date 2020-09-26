import React, {Component} from 'react';
import Slider from '@react-native-community/slider';
import {mainThemeColor, imageAdjusts} from '../../configuration';

import {StyleSheet, View, Text} from 'react-native';

export class Sliders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.getAdjustmentSliders();
  }

  getAdjustmentSliders() {
    return imageAdjusts.map(adjust => {
      return (
        <View key={adjust.key} style={styles.sliderContainer}>
          <Text>{adjust.title}</Text>
          <Slider
            style={{width: 300, height: 50}}
            value={this.props[adjust.type]}
            minimumValue={adjust.minimumValue}
            maximumValue={adjust.maximumValue}
            minimumTrackTintColor={mainThemeColor(1)}
            thumbTintColor={mainThemeColor(1)}
            onValueChange={this.props.updateValue(adjust.type)}
          />
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
  },
});
