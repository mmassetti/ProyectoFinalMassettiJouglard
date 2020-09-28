import {Container, Content, Spinner} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {mainThemeColor, galleryCameraButtons} from '../../configuration';
import {
  HomeCard,
  withImagePicker,
  withImageProcessing,
  withImageHandler,
} from '../../shared';
import {ImageModel} from '../../shared/models/ImageModel.js';

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
    try {
      this.setState({loading: true});
      const imageResponse = await this.props.imageHandler.pickImage()(picker);
      this.props.navigation.navigate('Imagen', imageResponse);
    } finally {
      this.setState({loading: false});
    }
  };
}

export default withImageHandler(GalleryCamera);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
