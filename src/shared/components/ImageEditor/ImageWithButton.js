import {mainThemeColor} from '../../configuration';
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ImageEditor} from '../../shared/components/ImageEditor';
import {BottomRightButton} from './BottomRightButton';

export class ImageWithAdjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
    };
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={this.shouldRotate()}
          source={{uri: this.props.imageToShow.getSource()}}
        />
        <BottomRightButton
          buttons={[
            {
              name: 'edit',
              type: 'Entypo',
              onPress: this.showEditor(true),
            },
          ]}
        />
        <ImageEditor
          image={this.props.imageToEdit}
          showOver={this.state.showEditor}
          updateImage={this.props.onImageAdjusted}
          onClose={this.showEditor(false)}
        />
      </View>
    );
  }

  showEditor = show => () => {
    this.setState({
      showEditor: show,
    });
  };

  shouldRotate() {
    let imageStyles = styles.image;
    if (this.props.shouldRotate) {
      imageStyles = {
        ...imageStyles,
        transform: [{rotate: '90deg'}],
      };
    }
    return imageStyles;
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 6,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
  },
});