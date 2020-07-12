import {Container, Content, Spinner} from 'native-base';

import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {mainThemeColor, homeButtons} from '../../configuration';
import {HomeCard, ImagePickerService, ImageProcessor} from '../../shared';

export class Home extends Component {
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
            <>{this.getHomeButtons()}</>
          )}
        </Content>
      </Container>
    );
  }

  getHomeButtons() {
    return homeButtons.map((button, index) => (
      <HomeCard
        key={index}
        onPress={this.launch(button.type)}
        icon={button.icon}
        text={button.text}
      />
    ));
  }

  launch = picker => async () => {
    this.props.navigation.navigate('GalleryCamera', {});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#20d2bb',
  },
});
