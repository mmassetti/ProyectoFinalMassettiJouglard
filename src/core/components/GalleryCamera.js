import {Container, Content, Spinner} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {mainThemeColor, galleryCameraButtons} from '../../configuration';
import {HomeCard, ImagePickerService, ImageProcessor} from '../../shared';
import {ImageModel} from '../../shared/models/ImageModel.js';

export default class GalleryCamera extends Component {
  picker;
  imageProcessor;

  constructor(props) {
    super(props);
    this.picker = ImagePickerService.getInstance();
    this.imageProcessor = ImageProcessor.getInstance();
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          {this.state.loading ? (
            <Spinner color={mainThemeColor(1)} />
          ) : (
            <>{this.getGalleryCameraButtons()}</>
          )}
        </Content>
      </Container>
    );
  }

  getGalleryCameraButtons() {
    return galleryCameraButtons.map((button, index) => (
      <HomeCard
        key={index}
        onPress={this.launch(button.type)}
        icon={button.icon}
        text={button.text}
      />
    ));
  }

  launch = picker => async () => {
    this.setState({loading: true});
    try {
      const {uri, data, width, height} = await this.picker[
        'getImageFrom' + picker
      ]();
      let imgModel = new ImageModel(data, height, width, uri);
      this.routeToImageView(imgModel);
    } catch (error) {
      this.setState({loading: false});
    }
  };

  async routeToImageView(originalImgModel) {
    const {
      img,
      //TODO: Encapsulate percentages in one object
      percentageGreen,
      percentageYellow,
      percentageNaked,
    } = await this.imageProcessor.processImage(originalImgModel.uri);
    this.setState({
      loading: false,
    });

    this.props.navigation.navigate('Imagen', {
      originalImage: originalImgModel,
      processedImage: new ImageModel(
        img,
        originalImgModel.height,
        originalImgModel.width,
      ),
      shouldRotate: originalImgModel.width < originalImgModel.height,
      percentageGreen: percentageGreen,
      percentageYellow: percentageYellow,
      percentageNaked: percentageNaked,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
