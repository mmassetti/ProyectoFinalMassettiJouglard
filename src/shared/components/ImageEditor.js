import {Button} from 'native-base';
import React, {Component} from 'react';
import {mainThemeColor} from '../../configuration';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Popover from 'react-native-popover-view';
import {imageAdjusts} from '../../configuration';
import CustomImage from './CustomNativeImage';
import {Sliders} from './Sliders';
import {BottomRightButton} from './BottomRightButton';

export class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      brightness: imageAdjusts[0].defaultValue,
      saturation: imageAdjusts[1].defaultValue,
      contrast: imageAdjusts[2].defaultValue,
      saveImg: false,
    };
  }

  render() {
    return (
      <Popover
        onCloseComplete={this.resetState}
        popoverStyle={styles.popover}
        isVisible={this.props.showOver}>
        <View style={styles.imageContainer}>
          <BottomRightButton
            type="Ionicons"
            name="refresh"
            onPress={this.resetAdjustment}
          />
          <CustomImage
            onSave={this.save}
            saveImage={this.state.saveImg}
            resizeMode="contain"
            style={styles.image}
            src={{
              source: [
                {
                  uri: this.props.image.getSource(),
                },
              ],
              width: this.props.image.getWidth(),
              height: this.props.image.getHeight(),
            }}
            brightness={this.state.brightness}
            saturation={this.state.saturation}
            contrast={this.state.contrast}
          />
        </View>
        <View style={styles.settingsContainer}>
          <Sliders
            updateValue={this.updateValue}
            contrast={this.state.contrast}
            brightness={this.state.brightness}
            saturation={this.state.saturation}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={this.props.onClose} light>
            <Text style={styles.buttonText}>Cancelar</Text>
          </Button>
          <Button style={styles.button} onPress={this.saveImg} primary>
            <Text style={styles.buttonText}>Confirmar</Text>
          </Button>
        </View>
      </Popover>
    );
  }

  saveImg = () => {
    this.setState({
      saveImg: true,
    });
    this.props.onClose();
  };

  save = event => {
    this.props.updateImage(event.nativeEvent.uri);
  };

  resetState = () => {
    this.setState({
      saveImg: false,
    });
  };

  updateValue = type => value => {
    this.setState({
      [type]: value,
    });
  };

  resetAdjustment = () => {
    this.setState({
      brightness: imageAdjusts[0].defaultValue,
      saturation: imageAdjusts[1].defaultValue,
      contrast: imageAdjusts[2].defaultValue,
    });
  };
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 3,
    width: '100%',
    paddingHorizontal: 5,
    paddingTop: 5,
    position: 'relative',
  },
  popover: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: mainThemeColor(1),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    zIndex: 99,
  },
  settingsContainer: {
    marginTop: 10,
    flex: 3,
    justifyContent: 'center',
  },
});
