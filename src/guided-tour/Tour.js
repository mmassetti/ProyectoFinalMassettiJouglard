import React, {Component} from 'react';
import {slides} from '../configuration/slides';
import AppIntroSlider from 'react-native-app-intro-slider';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Icon} from 'native-base';

export class Tour extends Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          type="FontAwesome5"
          name="arrow-right"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          type="FontAwesome5"
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 100,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this.props.onDone}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    maxHeight: '60%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
