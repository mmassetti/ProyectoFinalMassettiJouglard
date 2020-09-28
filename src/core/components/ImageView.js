import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {options, switchConfig} from '../../configuration';
import {
  ImageWithAdjustment,
  withCloudinary,
  withFirebase,
  withImageProcessing,
  SaveImage,
} from '../../shared';
import {Percentages} from './Percentages';

class ImageView extends Component {
  originalImage;
  onSave;

  constructor(props) {
    super(props);
    this.state = {
      showOriginal: false,
      ...this.props.navigation.state.params,
    };
    this.originalImage = this.state.originalImage.clone();
    this.onSave = this.props.navigation.state.params.onSave;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <SwitchSelector
            style={styles.switch}
            options={options}
            onPress={value =>
              this.setState({
                showOriginal: value,
              })
            }
            {...switchConfig}
          />
        </View>
        <ImageWithAdjustment
          onImageAdjusted={this.updateOriginalImage}
          imageToEdit={this.originalImage}
          shouldRotate={this.props.navigation.state.params.shouldRotate}
          imageToShow={this.getImage()}
        />
        <Percentages percentages={this.state.percentages} />
        {this.onSave ? (
          <SaveImage
            image={this.originalImage}
            onSave={this.props.navigation.state.params.onSave}
          />
        ) : null}
      </View>
    );
  }

  updateOriginalImage = async newUri => {
    let nativeReponse = await this.props.imageProcessor.processImage(
      'file://' + newUri,
    );

    this.setState(async prevState => {
      let newState = {
        ...prevState,
      };
      newState.originalImage.setUri('file://' + newUri);
      newState.processedImage.setData(nativeReponse.img);
      newState.percentageGreen = nativeReponse.percentageGreen;
      newState.percentageYellow = nativeReponse.percentageYellow;
      newState.percentageNaked = nativeReponse.percentageNaked;

      // // const uri = await this.cloudinaryService.uploadPhoto(
      // //   `data:image/png;base64,${newState.processedImage.getData()}`,
      // // );
      // const uri = await this.cloudinaryService.uploadPhoto(
      //   newState.originalImage.getUri(),
      // );
      // if (uri != null) {
      //   this.firebaseService.uploadPhoto(uri);
      // }
      return newState;
    });
  };

  getImage() {
    let sourceOfImage = this.state.showOriginal
      ? this.state.originalImage
      : this.state.processedImage;
    return sourceOfImage;
  }
}

export default withImageProcessing(withCloudinary(withFirebase(ImageView)));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  information: {
    flex: 1,
  },
  switchContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    width: '80%',
    zIndex: 99,
  },
});
