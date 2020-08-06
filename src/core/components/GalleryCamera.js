import {Container, Content, Spinner} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {mainThemeColor, galleryCameraButtons} from '../../configuration';
import {HomeCard, withImagePicker, withImageProcessing} from '../../shared';
import {ImageModel} from '../../shared/models/ImageModel.js';

export default withImagePicker(withImageProcessing(GalleryCamera));

class GalleryCamera extends Component {
  constructor(props) {
    super(props);
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
      const {uri, data, width, height} = await this.props.imagePicker[
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
    } = await this.props.imageProcessor.processImage(originalImgModel.uri);
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
