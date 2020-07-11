import {
  Container,
  Content,
  Spinner,
  Header,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Thumbnail,
  Button,
  Left,
  Body,
} from 'native-base';

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
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

  goToItem() {
    alert('llevame a la vista de la sesion por favor');
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem button onPress={this.goToItem}>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#20d2bb',
  },
});
